"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardHome() {
  const router = useRouter();

  //find token
  const getTokenFromCookie = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("sky_token="))
      ?.split("=")[1];
  };

  // ✅ 登录验证逻辑（可开启）
  useEffect(() => {
    const token = getTokenFromCookie();
    if (!token) {
      router.push("/"); // 没有token就跳回登录
    }
  }, []);

  return (
    <main className="p-8">
      {/* 标题区 */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">👋 欢迎回来，管理员！</h1>
        <p className="text-gray-600">以下是您管理 Sky Consultancy 的仪表板总览。</p>
      </div>

      {/* 统计数据卡片 */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-500 mb-1">今日发票</h2>
          <p className="text-2xl font-bold text-blue-600">RM 3,200.00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-500 mb-1">本月客户</h2>
          <p className="text-2xl font-bold text-green-600">12 位</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-500 mb-1">月收入</h2>
          <p className="text-2xl font-bold text-yellow-600">RM 14,800.00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-sm text-gray-500 mb-1">待处理工单</h2>
          <p className="text-2xl font-bold text-red-600">5 单</p>
        </div>
      </section>

      {/* 快捷导航 */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">🚀 快捷功能</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardLink icon="/image/cidbLogo.png" label="CIDB 系统" href="https://cims.cidb.gov.my" />
          <DashboardLink icon="/image/expatriateLogo.png" label="ESD 外劳系统" href="https://esd.imi.gov.my" />
          <DashboardLink icon="/image/octoBizLogo.png" label="CIMB Bank" href="https://www.cimboctobiz.com.my/digital/web/gl/bfo/login" />
        </div>
      </section>

      {/* 最近活动 */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 最近活动</h2>
        <ul className="bg-white divide-y rounded-lg shadow">
          <li className="p-4 text-gray-700">🧾 已开立 RM1,200 发票给 Loong Tat Construction</li>
          <li className="p-4 text-gray-700">🗂️ 跟进 ESD 文件提交（Kuantan 项目）</li>
          <li className="p-4 text-gray-700">✅ 完成 Swift Apply 网站更新</li>
        </ul>
      </section>

      {/* 占位符区块：未来可扩展图表或交易记录等 */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">📊 未来加入：图表 / 系统通知 / 绩效分析</h2>
        <div className="border-dashed border-2 border-gray-300 p-10 text-center rounded-lg text-gray-400">
          👉 未来可整合 Chart.js、业务 KPI、趋势分析 等内容
        </div>
      </section>
    </main>
  );
}

// ✅ 快捷导航卡片组件
function DashboardLink({ icon, label, href }: { icon: string; label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      className="bg-white p-6 rounded-lg shadow hover:shadow-md transition flex flex-col items-center text-center"
    >
      <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border border-gray-200">
        <Image src={icon} alt={label} width={64} height={64} className="object-cover w-full h-full" />
      </div>
      <h2 className="text-lg font-medium text-gray-800">{label}</h2>
    </a>
  );
}
