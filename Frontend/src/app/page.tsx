"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import lang from "@/language/lang.json"; // 语言包
import { Globe, Eye, EyeOff } from "lucide-react"; // 图标库

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState<"zh" | "en">("zh");

  const t = lang.login;

  // ✅ 封装函数：从 cookie 中获取 JWT
  const getTokenFromCookie = () => {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("sky_token="))
      ?.split("=")[1];
  };

  // ✅ 页面加载时：检查 token，若存在则跳转到 dashboard
  useEffect(() => {
    const token = getTokenFromCookie();
    if (token) {
      router.push("/dashboard");
    }
  }, []);

  // ✅ 登录提交逻辑
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setValidationError("");

    if (!username || !password) {
      setValidationError(t.empty[language]); // 账号或密码不能为空
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        // ✅ 设置 token 到 cookie，有效期 7 天
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        document.cookie = `sky_token=${data.token}; path=/; expires=${expires.toUTCString()}`;

        router.push("/dashboard");
      } else {
        setError(t.error[language] || "账号或密码错误");
        setUsername("");
        setPassword("");
      }
    } catch (err) {
      console.error("登录失败:", err);
      setError("⚠️ 服务器连接失败，请稍后再试");
    }
  };

  return (
    <>
      { /* Language Switch Button */ }
      <div className="fixed top-4 right-6 z-50">
        <button
          onClick={() => setLanguage(language === "zh" ? "en" : "zh")}
          className="relative min-w-[100px] flex items-center justify-center gap-2 px-4 py-1.5 rounded-full font-medium overflow-hidden group transition-all duration-300"
          aria-label="Language Switch"
        >
          {/* 动态背景 */}
          <span className="absolute inset-0 bg-gradient-to-r from-white to-gray-200 group-hover:from-gray-100 group-hover:to-white rounded-full shadow-2xl transition-all duration-300"></span>

          {/* 内容层：图标 + 文字 */}
          <span className="relative z-10 text-black flex items-center gap-2 group-hover:scale-105 transition-transform duration-300">
            <Globe className="w-5 h-5" />
            {language === "zh" ? "EN" : "中文"}
          </span>
        </button>
      </div>

      { /* Login Form UI */ }
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="bg-white/90 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl flex w-full max-w-4xl overflow-hidden min-h-[450px] max-h-[450px]">
        
        {/* Left Logo Section */}
        <div className="bg-white flex flex-col items-center justify-center w-1/2 p-10">
          <img
            src="/image/scmnsLogo.png"
            alt="Sky Consultancy Logo"
            className="h-44 w-44 object-contain rounded-full shadow-md border border-gray-200 mb-4"
          />
          <h2 className="text-lg font-semibold text-gray-700 text-center">让合规变得简单</h2>
          <p className="text-sm text-gray-500 mt-1 text-center">
            您值得信赖的一站式顾问伙伴
          </p>
        </div>

        {/* Right Form Section */}
        <form onSubmit={handleLogin} className="w-1/2 p-10 overflow-y-auto">
          <h1 className="text-2xl font-semibold mb-1 text-center text-gray-900">
            {t.title[language]}
          </h1>
          <p className="text-sm text-center text-gray-500 mb-6 tracking-wide">
            专注于承包商合规服务的专业伙伴
          </p>

          <p
            className={`text-red-500 text-sm mb-4 text-center transition-opacity duration-300 min-h-[1.25rem] ${
              validationError || error ? "opacity-100" : "opacity-0"
            }`}
          >
            {validationError
              ? t.empty[language]
              : error
              ? t.error[language]
              : " "}
          </p>

          <label className="text-sm text-gray-600 mb-1 block">{t.username[language]}</label>
          <input
            type="text"
            placeholder={t.usernamePlaceholder[language]}
            className="border border-gray-300 w-full px-4 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-black transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="text-sm text-gray-600 mb-1 block">{t.password[language]}</label>
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t.passwordPlaceholder[language]}
              className="border border-gray-300 w-full px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition"
              aria-label="Toggle Password Visibility"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 rounded-md hover:bg-gray-800 transition-all font-semibold tracking-wide"
          >
            {t.submit[language]}
          </button>
        </form>
      </div>
    </main>
    </>
  );
}
