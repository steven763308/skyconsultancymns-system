"use client";
import Breadcrumb from "@/components/Breadcrumb"; // 确保你有这个组件
import Link from "next/link";

export default function QuotationPage() {
  return (
    <main className="p-8">
      {/* 面包屑导航路径 */}
      <Breadcrumb paths={["Accounting", "Quotation"]} />

      {/* 页面标题 */}
      <h1 className="text-2xl font-bold mb-4">📄 报价单管理</h1>
      <p className="text-gray-600 mb-6">在这里你可以创建、查看与管理客户报价单。</p>

      {/* 功能入口 */}
      <div className="space-y-4">
        <Link
          href="/accounting/quotation/create"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ 新建报价单
        </Link>

        <div className="text-gray-400 text-sm">
          ⚠️ 暂无报价记录，未来可以在此显示报价单列表表格。
        </div>
      </div>
    </main>
  );
}
