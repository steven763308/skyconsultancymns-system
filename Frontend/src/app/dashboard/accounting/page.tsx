"use client";

import Link from "next/link";
import Image from "next/image";

export default function AccountingPanel() {
  return (
    <main className="p-8">
      {/* 页面标题与简介 */}
      <h1 className="text-3xl font-bold mb-2">📊 Accounting Panel</h1>
      <p className="text-gray-600 mb-6">
        管理报价单、发票与客户付款记录，一站式查看 Sky Consultancy 的财务相关事项。
      </p>

      {/* 三大功能卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Quotation 报价单 */}
        <Card
          href="/dashboard/accounting/quotation"
          title="Quotation 报价单"
          description="创建与管理客户报价单"
          imgSrc="/image/quotationLogo.png"
        />

        {/* Invoice 发票 */}
        <Card
          href="/dashboard/accounting/invoice"
          title="Invoice 发票"
          description="生成与管理销售发票"
          imgSrc="/image/invoiceLogo.png"
        />

        {/* Payment Tracking */}
        <Card
          href="/dashboard/accounting/paymenttrack"
          title="Payment Tracking"
          description="追踪客户付款状态与进度"
          imgSrc="/image/paymentTrack.png"
        />
      </div>
    </main>
  );
}

// ✅ 可复用卡片组件
function Card({
  href,
  title,
  description,
  imgSrc,
}: {
  href: string;
  title: string;
  description: string;
  imgSrc: string;
}) {
  return (
    <Link
      href={href}
      className="bg-white p-6 rounded-lg shadow hover:shadow-md transition flex flex-col items-center text-center"
    >
      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border border-gray-200">
        <Image
          src={imgSrc}
          alt={title}
          width={80}
          height={80}
          className="object-cover w-full h-full"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm text-gray-600">{description}</p>
    </Link>
  );
}
