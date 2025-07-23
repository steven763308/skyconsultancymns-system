"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Client {
  id: number;
  name: string;
  phone: string;
  company: string;
  email: string;
}

export default function CRMCustomerPage() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    // 模拟客户数据加载
    setClients([
      { id: 1, name: "Lim Ah Seng", phone: "012-3456789", company: "Lim Construction Sdn Bhd", email: "lim@example.com" },
      { id: 2, name: "Ali Bin Abu", phone: "013-9876543", company: "Ali Renovation Works", email: "ali@example.com" },
    ]);
  }, []);

  return (
    <main className="p-8">
      {/* Breadcrumb 导航 */}
      <nav className="text-sm text-gray-500 mb-4">
        <span className="hover:underline">
          <Link href="/dashboard/crm">CRM</Link>
        </span>
        <span className="mx-2">›</span>
        <span className="text-gray-700 font-medium">Customer</span>
      </nav>

      {/* 页面标题与简介 */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        📇 客户管理系统（CRM）
      </h1>
      <p className="text-gray-600 mb-6">
        Sky Consultancy 客户管理系统。
      </p>

      <div className="mb-6 flex justify-between items-center">
        <Link
          href="/crm/add"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          ➕ 新增客户
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left">客户名称</th>
              <th className="px-6 py-3 text-left">公司</th>
              <th className="px-6 py-3 text-left">电话</th>
              <th className="px-6 py-3 text-left">电邮</th>
              <th className="px-6 py-3 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-t">
                <td className="px-6 py-4">{client.name}</td>
                <td className="px-6 py-4">{client.company}</td>
                <td className="px-6 py-4">{client.phone}</td>
                <td className="px-6 py-4">{client.email}</td>
                <td className="px-6 py-4">
                  <Link
                    href={`/crm/${client.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    查看详情
                  </Link>
                </td>
              </tr>
            ))}
            {clients.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500">
                  暂无客户记录。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
