"use client";
import { useState } from "react";
import Link from "next/link";
import CrmTracking from "@/components/crm/crmTracking";
import CrmBroadcastTabs from "@/components/crm/crmBroadcastTab";

export default function MarketingBlastingPage() {
  const [selected, setSelected] = useState<"whatsapp" | "email" | null>(null);

  const sampleData = [
    {
      time: "2025-07-23 14:20",
      recipient: "019-1234567",
      message: "促销信息：欢迎订购！",
      status: "已发送",
    },
    {
      time: "2025-07-23 13:50",
      recipient: "test@example.com",
      message: "最新优惠已上线，立即查看！",
      status: "发送失败",
    },
    {
      time: "2025-07-23 13:30",
      recipient: "019-7654321",
      message: "Hello，这是测试信息",
      status: "正在发送",
    },
  ];

  return (
    <main className="p-8">
      {/* 面包屑导航 */}
      <nav className="text-sm text-gray-500 mb-4">
        <span className="hover:underline">
            <Link href="/dashboard/crm">CRM</Link>
        </span>
        <span className="mx-2">›</span>
        <span className="text-gray-700 font-medium">Marketing</span>
      </nav>

      {/* 页面标题和说明 */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">📢 Marketing Blasting</h1>
      <p className="text-gray-600 mb-6">选择要使用的方式，通过 WhatsApp 或 Email 群发信息给客户。</p>

      {/* 实况追踪区块 */}
      <div className="max-w-6xl mx-auto mb-8">
        <CrmTracking data={sampleData} />
      </div>

      <div className="max-w-6xl mx-auto mt-8">
        <CrmBroadcastTabs />
      </div>
    </main>
  );
}
