"use client";

import { useState } from "react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    position: "",
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    position: "",
    email: "",
    username: "",
    password: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: formData.name ? "" : "请输入名字",
      phone: formData.phone ? "" : "请输入电话号码",
      position: formData.position ? "" : "请选择职位",
      email: /^\S+@\S+\.\S+$/.test(formData.email)
        ? ""
        : "请输入有效的邮件地址",
      username: formData.username ? "" : "请输入用户名",
      password:
        formData.password.length >= 6
          ? ""
          : "密码至少需要 6 个字符",
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("注册失败");

      alert("用户注册成功！");
      onClose();
      setFormData({
        name: "",
        phone: "",
        position: "",
        email: "",
        username: "",
        password: "",
      });
      setErrors({
        name: "",
        phone: "",
        position: "",
        email: "",
        username: "",
        password: "",
      });
    } catch (error) {
      alert("发生错误，请稍后重试");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 rounded-lg shadow-xl w-full max-w-md p-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">注册新用户</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        {[
          { label: "名字", name: "name", type: "text" },
          { label: "电话号码", name: "phone", type: "text" },
          { label: "邮件地址", name: "email", type: "email" },
          { label: "用户名", name: "username", type: "text" },
          { label: "密码", name: "password", type: "password" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block mb-1 font-medium">{label}</label>
            <input
              type={type}
              name={name}
              value={(formData as any)[name]}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
                errors[name as keyof typeof errors]
                  ? "border-red-500"
                  : "focus:border-blue-400"
              }`}
            />
            {errors[name as keyof typeof errors] && (
              <p className="text-sm text-red-600 mt-1">
                {errors[name as keyof typeof errors]}
              </p>
            )}
          </div>
        ))}

        <div>
          <label className="block mb-1 font-medium">职位</label>
          <select
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded bg-white focus:outline-none focus:ring ${
              errors.position ? "border-red-500" : "focus:border-blue-400"
            }`}
          >
            <option value="">请选择职位</option>
            <option value="Admin">管理员</option>
            <option value="Manager">经理</option>
            <option value="Staff">员工</option>
            <option value="Intern">实习生</option>
          </select>
          {errors.position && (
            <p className="text-sm text-red-600 mt-1">{errors.position}</p>
          )}
        </div>
      </div>

      <button
        onClick={handleRegister}
        className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        注册用户
      </button>
    </div>
  );
}
