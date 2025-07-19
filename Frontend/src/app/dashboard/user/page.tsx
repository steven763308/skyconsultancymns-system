"use client";

import { useState } from "react";
import RegisterModal from "@/components/RegisterModal";
import RolePermissionModal from "@/components/RolePermissionModal";
import UserTable from "@/components/UserTable";

export default function UserPage() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const handleSavePermissions = (permissions: Record<string, string[]>) => {
    console.log("权限已保存：", permissions);
    // TODO: 可发 API 请求保存到后端
    setIsPermissionModalOpen(false);
  };

  return (
    <main className="p-8">
      {/* 标题与简介 */}
      <h1 className="text-3xl font-bold text-gray-800 mb-5">
        🛠️ 用户管理 User Management
      </h1>
      <p className="text-gray-600 mb-6">
        你可以在这里查看、编辑用户信息与权限。
      </p>

      {/* 按钮区 */}
      <div className="mb-6 flex items-center space-x-5">
        <button
          onClick={() => setIsRegisterModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          添加用户
        </button>
        <button
          onClick={() => setIsPermissionModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          权限设置
        </button>
      </div>

      {/* 用户表格 */}
      <UserTable refreshSignal={refreshCount} />

      {/* 注册弹窗 */}
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => {
          setIsRegisterModalOpen(false);
          setRefreshCount((prev) => prev + 1);
        }}
      />

      {/* 权限弹窗（打开后直接显示，无额外按钮） */}
      {isPermissionModalOpen && (
        <RolePermissionModal
          isOpen={isPermissionModalOpen}
          onClose={() => setIsPermissionModalOpen(false)}
          roles={["Admin", "Manager", "Staff"]}
          features={[
            { key: "dashboard", label: "Dashboard" },
            { key: "service", label: "服务管理" },
            { key: "accounting", label: "财务" },
            { key: "project", label: "项目管理" },
            { key: "user", label: "用户管理" },
            { key: "settings", label: "设定" },
          ]}
          onSave={handleSavePermissions}
        />
      )}
    </main>
  );
}
