"use client";

import { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  username: string;
}

interface Props {
  refreshSignal?: number; // 可选：触发刷新（用于外部注册后更新）
}

export default function UserTable({ refreshSignal }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确认删除该用户？")) return;
    await fetch(`/api/users/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  const handlePermission = (user: User) => {
    alert(`权限设置功能开发中（用户：${user.name}）`);
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshSignal]); // 注册成功时触发刷新

  return (
    <div className="overflow-x-auto bg-white rounded shadow">
      {loading ? (
        <p className="p-4">加载中...</p>
      ) : (
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">名字</th>
              <th className="px-4 py-2 border">职位</th>
              <th className="px-4 py-2 border">电话</th>
              <th className="px-4 py-2 border">邮箱</th>
              <th className="px-4 py-2 border">用户名</th>
              <th className="px-4 py-2 border text-center">操作</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  暂无用户数据
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{user.name}</td>
                  <td className="px-4 py-2 border">{user.position}</td>
                  <td className="px-4 py-2 border">{user.phone}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.username}</td>
                  <td className="px-4 py-2 border text-center space-x-2">
                    <button
                      onClick={() => handlePermission(user)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      设置权限
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
