"use client";

import { useState } from "react";
import { UserCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

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
    confirmPassword: "",
    gender: "",
    dob: "",
    photo: null as File | null,
    bio: "",
    joinDate: ""
  });

  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {
      name: formData.name ? "" : "请输入名字",
      phone: formData.phone ? "" : "请输入电话号码",
      position: formData.position ? "" : "请选择职位",
      email: /^\S+@\S+\.\S+$/.test(formData.email) ? "" : "请输入有效的邮件地址",
      username: formData.username ? "" : "请输入用户名",
      password: formData.password.length >= 6 ? "" : "密码至少需要6个字符",
      confirmPassword: formData.confirmPassword === formData.password ? "" : "两次密码输入不一致"
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((err) => err === "");
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, photo: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const formPayload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) formPayload.append(key, value);
      });

      const res = await fetch(`${baseUrl}/register`, {
        method: "POST",
        body: formPayload,
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
        confirmPassword: "",
        gender: "",
        dob: "",
        photo: null,
        bio: "",
        joinDate: ""
      });
      setPhotoPreview(null);
      setErrors({});
    } catch (error) {
      alert("发生错误，请稍后重试");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg border border-gray-300 bg-white p-6 shadow-xl animate-fade-in">
        <button onClick={onClose} className="absolute top-4 right-4 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition p-1">
          <XMarkIcon className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-bold text-center mb-4">注册新用户</h2>

        <div className="flex justify-center mb-6">
          <div className="relative">
            {photoPreview ? (
              <img src={photoPreview} alt="头像预览" className="w-24 h-24 rounded-full object-cover border" />
            ) : (
              <UserCircleIcon className="w-24 h-24 text-gray-300" />
            )}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              title="点击上传照片"
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-center mb-2">个人资料</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="名字" name="name" value={formData.name} onChange={handleInputChange} error={errors.name} />
          <InputField label="电话号码" name="phone" value={formData.phone} onChange={handleInputChange} error={errors.phone} />
          <InputField label="出生日期" name="dob" type="date" value={formData.dob} onChange={handleInputChange} />
          <div>
            <label className="block mb-1 font-medium">性别</label>
            <div className="flex gap-4 px-1 py-2">
              {['男', '女', '其他'].map((g) => (
                <label key={g} className="flex items-center gap-2">
                  <input type="radio" name="gender" value={g} checked={formData.gender === g} onChange={handleInputChange} />
                  {g}
                </label>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">简介</label>
            <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={3} className="w-full px-3 py-2 border rounded"></textarea>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-center mt-8 mb-2">公司职位与账户信息</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="邮件地址" name="email" type="email" value={formData.email} onChange={handleInputChange} error={errors.email} />
          <InputField label="职位" name="position" value={formData.position} onChange={handleInputChange} error={errors.position} />
          <InputField label="入职日期" name="joinDate" type="date" value={formData.joinDate} onChange={handleInputChange} />
          <InputField label="用户名" name="username" value={formData.username} onChange={handleInputChange} error={errors.username} />
          <InputField label="密码" name="password" type="password" value={formData.password} onChange={handleInputChange} error={errors.password} />
          <InputField label="确认密码" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} error={errors.confirmPassword} />
        </div>

        <button onClick={handleRegister} className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
          注册用户
        </button>
      </div>
    </div>
  );
}

function InputField({ label, name, type = "text", value, onChange, error }: any) {
  return (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring ${
          error ? "border-red-500" : "focus:border-blue-400"
        }`}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
