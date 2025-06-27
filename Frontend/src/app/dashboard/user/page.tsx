"use client";

import { useState } from "react";
import RegisterModal from "@/components/RegisterModal";
import UserTable from "@/components/UserTable";

export default function UserPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0); // 用于刷新表格

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-1">用户管理</h2>
          <p className="text-gray-600">你可以在这里查看、编辑用户信息。</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          添加用户
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
    </div>
  );
}
