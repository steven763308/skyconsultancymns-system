"use client";

import { useState } from "react";
import Link from "next/link";

interface Project {
  id: number;
  name: string;
  client: string;
  status: "进行中" | "已完成" | "已暂停";
}

export default function ProjectManagementPage() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Sky Consultancy 官网开发",
      client: "Ho Zi Qi",
      status: "进行中",
    },
    {
      id: 2,
      name: "Alpha Capital 投资系统",
      client: "Alpha Team",
      status: "已暂停",
    },
  ]);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">📁 项目管理 Project Management</h1>
        <p className="text-gray-600 mt-1">在这里你可以查看、管理你的项目进度。</p>
      </div>

      {/* 新增项目按钮 */}
      <div className="mb-4">
        <Link href="/project-management/new">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            ➕ 新增项目
          </button>
        </Link>
      </div>

      {/* 项目列表 */}
      {projects.length === 0 ? (
        <div className="text-yellow-600 mt-6">⚠️ 暂无项目记录，未来可以在此查看项目列表。</div>
      ) : (
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">项目名称</th>
              <th className="border px-4 py-2">客户</th>
              <th className="border px-4 py-2">状态</th>
              <th className="border px-4 py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="border px-4 py-2">{project.name}</td>
                <td className="border px-4 py-2">{project.client}</td>
                <td className="border px-4 py-2">{project.status}</td>
                <td className="border px-4 py-2">
                  <Link href={`/project-management/${project.id}`}>
                    <button className="text-blue-600 hover:underline">查看详情</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
