"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

// ✅ Scraper 状态数据结构定义
interface ScraperStatus {
  status: "idle" | "running" | "paused" | "stopped" | "completed";
  current_page: number;
  total_pages: number;
  last_run: string;
  estimated_time_left: string;
}

// ✅ 单笔数据结构（根据 Excel 表头修改）
interface ScrapedData {
  id: number;
  company_name: string;
  tel_no: string;
  fax_no: string;
  registration_no: string;
  expiry_date: string;
  grade: string;
}

export default function ScraperDashboardPage() {
  const [status, setStatus] = useState<ScraperStatus | null>(null);
  const [data, setData] = useState<ScrapedData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStatus = async () => {
    try {
      const res = await axios.get<ScraperStatus>("/api/scraper/status");
      setStatus(res.data);
    } catch (err) {
      console.error("状态获取失败", err);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get<ScrapedData[]>("/api/scraper/data");
      setData(res.data);
    } catch (err) {
      console.error("数据获取失败", err);
    }
  };

  const controlScraper = async (action: "start" | "pause" | "stop") => {
    setLoading(true);
    try {
      await axios.post(`/api/scraper/${action}`);
      fetchStatus();
    } catch (err) {
      console.error(`${action} 操作失败`, err);
    } finally {
      setLoading(false);
    }
  };

  const exportData = async (format: "csv" | "xlsx") => {
    try {
      const res = await axios.get<Blob>(`/api/scraper/export?format=${format}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement("a");
      a.href = url;
      a.download = `scraper_export.${format}`;
      a.click();
    } catch (err) {
      console.error("导出失败", err);
    }
  };

  useEffect(() => {
    fetchStatus();
    fetchData();
    const interval = setInterval(() => {
      fetchStatus();
      fetchData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="p-8">
      <nav className="text-sm text-gray-500 mb-4">
        <span className="hover:underline">
          <Link href="/dashboard/crm">CRM</Link>
        </span>
        <span className="mx-2">›</span>
        <span className="text-gray-700 font-medium">Scraper</span>
      </nav>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">🕷️ Scraper 控制台</h1>
      <p className="text-gray-600 mb-6">控制与追踪爬虫任务，并导出分析数据。</p>

      <div className="flex gap-4 mb-6">
        <button onClick={() => controlScraper("start")} disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">🚀 开始</button>
        <button onClick={() => controlScraper("pause")} disabled={loading} className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600">⏸️ 暂停</button>
        <button onClick={() => controlScraper("stop")} disabled={loading} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">⛔ 停止</button>
        <button onClick={() => exportData("csv")} className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">📄 导出 CSV</button>
        <button onClick={() => exportData("xlsx")} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">📊 导出 Excel</button>
      </div>

      {status && (
        <div className="mb-6 text-gray-700 space-y-2">
          <p>📊 当前状态：<strong>{status.status}</strong></p>
          <p>📅 上次运行：{status.last_run || "无记录"}</p>
          <p>📈 进度：第 {status.current_page} / {status.total_pages} 页</p>
          <p>⏳ 预计剩余时间：{status.estimated_time_left}</p>
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-auto">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">注册编号</th>
              <th className="px-4 py-3 text-left">公司名称</th>
              <th className="px-4 py-3 text-left">等级</th>
              <th className="px-4 py-3 text-left">电话</th>
              <th className="px-4 py-3 text-left">传真</th>
              <th className="px-4 py-3 text-left">有效期</th>
              <th className="px-4 py-3 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.registration_no}</td>
                <td className="px-4 py-2">{item.company_name}</td>
                <td className="px-4 py-2">{item.grade}</td>
                <td className="px-4 py-2">{item.tel_no}</td>
                <td className="px-4 py-2">{item.fax_no}</td>
                <td className="px-4 py-2">{item.expiry_date}</td>
                <td className="px-4 py-2 text-blue-600 underline cursor-pointer">编辑 | 删除</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">暂无数据</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}