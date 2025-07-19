"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

export default function InvoicePage() {
  return (
    <main className="p-8">
      <Breadcrumb basePath="/dashboard" paths={["Accounting", "Invoice"]} />

      <h1 className="text-2xl font-bold mb-4">🧾 发票管理</h1>
      <p className="text-gray-600 mb-6">
        创建、发送与管理发票，方便你记录所有账单与交易。
      </p>

      <div className="space-y-4">
        <Link
          href="/dashboard/accounting/invoice/create"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ 新建发票
        </Link>

        <div className="text-gray-400 text-sm">
          ⚠️ 暂无发票记录，未来可添加发票列表与导出功能。
        </div>
      </div>
    </main>
  );
}
