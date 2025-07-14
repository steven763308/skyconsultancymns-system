"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

export default function PaymentTrackingPage() {
  return (
    <main className="p-8">
      <Breadcrumb paths={["Dashboard", "Accounting", "Payment Tracking"]} />

      <h1 className="text-2xl font-bold mb-4">💰 付款追踪</h1>
      <p className="text-gray-600 mb-6">
        查看客户是否已付款、付款方式与状态追踪。
      </p>

      <div className="space-y-4">
        <Link
          href="/dashboard/accounting/payment-tracking/list"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          📋 查看付款记录
        </Link>

        <div className="text-gray-400 text-sm">
          ⚠️ 暂无付款资料，未来可添加客户付款状态表。
        </div>
      </div>
    </main>
  );
}
