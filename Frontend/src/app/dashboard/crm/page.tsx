"use client";
import Link from "next/link";

export default function CRMHomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">📇 Sky Consultancy CRM 系统</h1>
      <p className="text-gray-600 mb-8">管理客户、进行市场推广，一站式处理业务相关事务。</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* 卡片 1：Scraper */}
        <Link href="/dashboard/crm/scraper">
          <div className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">🕷️ Contractor Scraper</h2>
            <p className="text-gray-600">通过 Scraper 挖掘潜在客户信息与数据。</p>
          </div>
        </Link>
        
        {/* 卡片 2：Marketing Blasting */}
        <Link href="/dashboard/crm/marketing">
          <div className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">📢 Marketing Blasting</h2>
            <p className="text-gray-600">通过 WhatsApp 和 Email 群发信息给潜在客户。</p>
          </div>
        </Link>

        {/* 卡片 3：Marketing Blasting 2*/}
        <Link href="/dashboard/crm/marketing2">
          <div className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">📢 Marketing Blasting 2 (NEW)</h2>
            <p className="text-gray-600">通过 WhatsApp 和 Email 群发信息给潜在客户。</p>
          </div>
        </Link>

        {/* 卡片 4：客户维护系统 */}
        <Link href="/dashboard/crm/customer">
          <div className="cursor-pointer rounded-xl border border-gray-200 bg-white p-6 shadow-md hover:shadow-lg transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">🧑‍💼 客户维护系统</h2>
            <p className="text-gray-600">查看客户列表，管理客户信息，跟进进度。</p>
          </div>
        </Link>
      </div>
    </main>
  );
}
