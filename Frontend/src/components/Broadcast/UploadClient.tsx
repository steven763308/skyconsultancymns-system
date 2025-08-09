// /components/Broadcast/UploadClientCsv.tsx
"use client";
import React, { useState } from "react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useApi } from "@/hooks/useApi";

type Row = Record<string, any>;
const REQUIRED = ["company", "gred", "phone", "expiry"] as const;

function normalizeHeader(h: string) {
  return h?.toString().trim().toLowerCase().replace(/\s+/g, "_");
}
function normalizeKeys(obj: Row) {
  const out: Row = {};
  Object.keys(obj).forEach((k) => (out[normalizeHeader(k)] = obj[k]));
  return out;
}
function parseDateLoose(v: any): string | null {
  // 支持：Excel 日期序列、日期字符串
  if (v == null || v === "") return null;
  // Excel serial number
  if (typeof v === "number") {
    // Excel 序列基准：1899-12-30
    const d = new Date(Date.UTC(1899, 11, 30));
    d.setUTCDate(d.getUTCDate() + Math.round(v));
    return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
  }
  // 字符串尝试 Date 解析或常见格式
  const s = String(v).trim();
  const try1 = new Date(s);
  if (!isNaN(try1.getTime())) return try1.toISOString().slice(0, 10);

  // 尝试 dd/mm/yyyy
  const m = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if (m) {
    const [_, dd, mm, yyyy] = m;
    const y = Number(yyyy.length === 2 ? "20" + yyyy : yyyy);
    const d = new Date(y, Number(mm) - 1, Number(dd));
    return isNaN(d.getTime()) ? null : d.toISOString().slice(0, 10);
  }
  return null;
}

export default function UploadClientCsv() {
  const { api } = useApi();
  const [rows, setRows] = useState<Row[]>([]);
  const [uploading, setUploading] = useState(false);
  const [filename, setFilename] = useState<string>("");

  const onFile = (file: File) => {
    setFilename(file.name);
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext === "csv") parseCsv(file);
    else if (ext === "xlsx" || ext === "xls") parseExcel(file);
    else alert("仅支持 CSV、XLS、XLSX 格式");
  };

  function parseCsv(file: File) {
    Papa.parse<Row>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (res) => {
        const data = (res.data || []).map(normalizeKeys).map(enrichRow);
        setRows(filterEmpty(data));
        validateHeaders(data);
      },
      error: (e) => alert("CSV 解析失败：" + e.message),
    });
  }

  async function parseExcel(file: File) {
    try {
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const sheetName = wb.SheetNames[0];
      const ws = wb.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json<Row>(ws, { defval: "" });
      const data = json.map(normalizeKeys).map(enrichRow);
      setRows(filterEmpty(data));
      validateHeaders(data);
    } catch (e: any) {
      alert("Excel 解析失败：" + (e?.message || e));
    }
  }

  function enrichRow(r: Row) {
    // 统一把 expiry 转为 YYYY-MM-DD（如果能解析）
    if ("expiry" in r) {
      const iso = parseDateLoose(r["expiry"]);
      if (iso) r["expiry"] = iso;
    }
    return r;
  }

  function filterEmpty(list: Row[]) {
    return list.filter(
      (r) => Object.values(r).some((v) => String(v ?? "").trim() !== "")
    );
  }

  function validateHeaders(list: Row[]) {
    if (!list.length) return;
    const keys = Object.keys(list[0]);
    const missing = REQUIRED.filter((k) => !keys.includes(k));
    if (missing.length) {
      alert(
        `缺少必需字段：${missing.join(
          ", "
        )}\n请确保表头包含：company, gred, phone, expiry`
      );
    }
  }

  const handleUpload = async () => {
    if (!rows.length) return;
    // 二次校验
    const missing = REQUIRED.filter((k) => !(k in rows[0]));
    if (missing.length) {
      return alert(
        `缺少必需字段：${missing.join(", ")}。请检查文件表头。`
      );
    }

    setUploading(true);
    try {
      await api("/api/clients/upload", {
        method: "POST",
        body: JSON.stringify({ rows }),
      });
      alert("Clients uploaded to your personal space ✅");
      // 可选：上传成功后清空
      // setRows([]);
      // setFilename("");
    } catch (e: any) {
      alert(e?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-2xl p-4 md:p-6 bg-zinc-900/60 border border-zinc-800">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">My Audience (CSV / Excel)</h3>
          {filename && (
            <div className="text-xs text-zinc-400 mt-1">Selected: {filename}</div>
          )}
        </div>
        <label className="cursor-pointer text-sm px-3 py-2 rounded-xl border border-zinc-700 hover:bg-zinc-800">
          Select File
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            className="hidden"
            onChange={(e) => e.target.files && onFile(e.target.files[0])}
          />
        </label>
      </div>

      {rows.length ? (
        <div className="max-h-64 overflow-auto border border-zinc-800 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-zinc-800 sticky top-0">
              <tr>
                {Object.keys(rows[0])
                  .slice(0, 6)
                  .map((k) => (
                    <th key={k} className="text-left px-3 py-2 font-medium">
                      {k}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 50).map((r, i) => (
                <tr key={i} className="odd:bg-zinc-900">
                  {Object.values(r)
                    .slice(0, 6)
                    .map((v, j) => (
                      <td key={j} className="px-3 py-2 whitespace-nowrap">
                        {String(v)}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-sm text-zinc-400">
          Expected headers: <code>company, gred, phone, expiry</code>
          （Excel 默认读取第一个工作表）
        </p>
      )}

      <div className="mt-4 flex gap-3">
        <button
          onClick={handleUpload}
          disabled={!rows.length || uploading}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Upload to My Space"}
        </button>
      </div>
    </div>
  );
}
