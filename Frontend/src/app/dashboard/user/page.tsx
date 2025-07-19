"use client";

import { useState } from "react";
import RegisterModal from "@/components/RegisterModal";
import UserTable from "@/components/UserTable";

export default function UserPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0); // 用于刷新表格

  return (
    <main className="p-8">
      {/* 页面标题与简介 */}
      <h1 className="text-3xl font-bold text-gray-800 mb-5">
        🛠️ 用户管理 User Management
      </h1>
      <p className="text-gray-600 mb-6">
        你可以在这里查看、编辑用户信息。
      </p>
      
      <div className="mb-6 flex items-center space-x-5">
        <button
          onClick={() => setIsModalOpen(true)} //change to permission panel
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          添加用户
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          权限设置
        </button>
      </div>

      {/* ✅ 表格组件 */}
      <UserTable refreshSignal={refreshCount} />

      {/* ✅ 注册弹窗 */}
      <RegisterModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setRefreshCount((prev) => prev + 1); // 触发表格刷新
        }}
      />
    </main>
  );
}
