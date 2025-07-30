"use client";

import { useState } from "react";
import { PaperClipIcon, TrashIcon } from "@heroicons/react/24/outline";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { EnvelopeIcon, ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid";

interface Contact {
  id: number;
  value: string;
  status: "pending" | "success" | "error";
}

export default function CrmBroadcastTabs() {
  const [tab, setTab] = useState<"whatsapp" | "email">("whatsapp");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [message, setMessage] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [senderEmail, setSenderEmail] = useState("user@example.com");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCSVUpload = (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (extension === "xlsx") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as string[][];
        const contactList: Contact[] = json
          .map((row, idx) => row[0]?.toString().trim())
          .filter(Boolean)
          .map((val, id) => ({ id, value: val, status: "pending" }));
        setContacts(contactList);
      };
      reader.readAsArrayBuffer(file);
    } else {
      Papa.parse(file, {
        complete: (results: any) => {
          const parsed = results.data as string[][];
          const contactList: Contact[] = parsed
            .map((row, index) => row[0]?.trim())
            .filter((val: string) => val)
            .map((val, idx) => ({ id: idx, value: val, status: "pending" }));
          setContacts(contactList);
        },
      });
    }
    setCsvFile(file);
  };

  const handleSend = async () => {
    if (!contacts.length || !message) return;
    setIsSending(true);
    setProgress(0);

    for (let i = 0; i < contacts.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      const isFail = Math.random() < 0.15;
      setContacts((prev) =>
        prev.map((c) =>
          c.id === contacts[i].id ? { ...c, status: isFail ? "error" : "success" } : c
        )
      );
      setProgress(Math.round(((i + 1) / contacts.length) * 100));
    }

    setIsSending(false);
  };

  const retryFailed = () => {
    setContacts((prev) =>
      prev.map((c) => (c.status === "error" ? { ...c, status: "pending" } : c))
    );
    handleSend();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">📤 批量群发工具</h2>
      <p className="text-gray-500 mb-6">通过 WhatsApp 或 Email 群发消息至联系人名单</p>

      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setTab("whatsapp")}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
            tab === "whatsapp"
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-green-100"
          }`}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" /> WhatsApp
        </button>
        <button
          onClick={() => setTab("email")}
          className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
            tab === "email"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-blue-100"
          }`}
        >
          <EnvelopeIcon className="w-5 h-5" /> Email
        </button>
      </div>

      {tab === "email" && (
        <div className="space-y-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">📨 Email 标题</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              placeholder="请输入邮件标题"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">📧 发件人邮箱</label>
            <input
              type="email"
              className="w-full border rounded p-2"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="默认使用登入账号邮箱，可修改"
            />
          </div>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">📂 上传客户名单 (CSV 或 XLSX)</label>
        {csvFile ? (
          <div className="flex justify-between items-center border px-3 py-2 rounded bg-gray-50">
            <span>{csvFile.name}</span>
            <TrashIcon
              className="w-5 h-5 text-red-400 cursor-pointer"
              onClick={() => {
                setCsvFile(null);
                setContacts([]);
              }}
            />
          </div>
        ) : (
          <input
            type="file"
            accept=".csv, .xlsx"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleCSVUpload(file);
            }}
            className="border p-2 w-full"
          />
        )}
        {contacts.length > 0 && (
          <p className="text-sm text-gray-500 mt-1">共 {contacts.length} 个联系人</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">✍️ 群发内容</label>
        <textarea
          className="w-full border rounded p-3"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">📷 图片</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">📄 PDF</label>
          <input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} />
        </div>
      </div>

      {contacts.length > 0 && (
        <div className="mb-4">
          <div className="h-3 bg-gray-200 rounded overflow-hidden">
            <div
              className="bg-indigo-500 h-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">发送进度：{progress}%</p>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          onClick={retryFailed}
          disabled={!contacts.some((c) => c.status === "error")}
          className="px-4 py-2 rounded bg-yellow-500 text-white disabled:opacity-50"
        >
          🔁 重试失败
        </button>
        <button
          onClick={handleSend}
          disabled={isSending || !contacts.length || !message}
          className="px-6 py-3 rounded-lg font-semibold text-white transition disabled:opacity-50 bg-indigo-600 hover:bg-indigo-700"
        >
          {isSending ? "发送中..." : "🚀 立即发送"}
        </button>
      </div>

      <div className="mt-6 space-y-1 text-sm">
        {contacts.map((c) => (
          <div
            key={c.id}
            className={`p-2 rounded border flex justify-between items-center ${
              c.status === "success"
                ? "bg-green-100 text-green-800"
                : c.status === "error"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <span>{c.value}</span>
            <span>
              {c.status === "pending"
                ? "等待发送..."
                : c.status === "success"
                ? "✅ 成功"
                : "❌ 失败"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}