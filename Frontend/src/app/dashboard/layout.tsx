"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import {
  Pin,
  PinOff,
  LogOut,
  Home,
  KanbanSquare,
  Monitor,
  LayoutDashboard,
  UserCog,
  Bolt,
  Menu,
  Users,
  BookOpen,
} from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isPinned, setIsPinned] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isCollapsed = !isPinned && !isHovered;
  const sidebarWidth = isCollapsed ? 64 : 256;

  //check login token
  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sky_token="))
      ?.split("=")[1];

    if (!token) {
      router.replace("/"); // 无 token，重定向回登录页
    }
  }, []);

  // 检查是否是移动设备
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(false); // desktop 自动关闭 mobile sidebar
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "Services", href: "/dashboard/service", icon: <Monitor size={18} /> },
    { label: "Accounting", href: "/dashboard/accounting", icon: <BookOpen size={18} /> },
    { label: "Project Management", href: "/dashboard/project", icon: <KanbanSquare size={18} /> },
    { label: "CRM", href: "/dashboard/crm", icon: <Users size={18} /> },
    { label: "用户管理", href: "/dashboard/user", icon: <UserCog size={18} /> },
    { label: "设定", href: "/dashboard/settings", icon: <Bolt size={18} /> },
  ];

  return (
    <div className="min-h-screen">
      {/* ✅ Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen bg-gray-800 text-white p-4 flex flex-col
          transition-all duration-300 ease-in-out
          ${isMobile
            ? isSidebarOpen
              ? "w-64"
              : "w-0 overflow-hidden"
            : isCollapsed
            ? "w-16"
            : "w-64"}
        `}
        onMouseEnter={() => !isPinned && !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isPinned && !isMobile && setIsHovered(false)}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          {!isCollapsed && !isMobile && (
            <h2 className="text-lg font-bold transition-opacity duration-200">
              Sky Consultancy
            </h2>
          )}
          {!isMobile && (
            <button
              onClick={() => setIsPinned(!isPinned)}
              className="text-white hover:text-yellow-400 transition ml-auto"
              title={isPinned ? "Unpin" : "Pin"}
            >
              {isPinned ? <PinOff size={18} /> : <Pin size={18} />}
            </button>
          )}
        </div>

        {/* Nav links */}
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`group flex items-center justify-center lg:justify-start mb-3 transition-all ${
              pathname === link.href
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            } ${
              isCollapsed && !isMobile
                ? "p-3 rounded-full" // collapsed 状态下用圆形按钮
                : "px-4 py-3 rounded-lg" // full 状态下用方形按钮
            }`}
          >
            {/* Icon 区块 */}
            <span className="text-xl">{link.icon}</span>

            {/* Label 只在展开状态下显示 */}
            {!isCollapsed && (!isMobile || isSidebarOpen) && (
              <span className="ml-3 text-base font-medium">{link.label}</span>
            )}
          </Link>
        ))}
      </aside>

      {/* ✅ 主内容区域（自动偏移） */}
      <div
        className="flex flex-col min-h-screen transition-all duration-300 ease-in-out"
        style={{ marginLeft: !isMobile ? `${sidebarWidth}px` : "0" }}
      >
        {/* Topbar */}
        <header className="bg-white shadow p-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-2">
            {/* ✅ 汉堡按钮（仅在 mobile 时显示） */}
            {isMobile && (
              <button
                className="text-gray-800 hover:text-black"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <Menu size={22} />
              </button>
            )}
            <h1 className="text-xl font-semibold">后台系统</h1>
          </div>
          <div className="flex items-center gap-3">
  {/* 🌐 语言切换按钮（统一大小 + 黑底白字） */}
  <button
    className="flex items-center justify-center w-30 gap-2 px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-gray-800 transition duration-200"
    onClick={() => {
      // ✨ TODO: 语言切换逻辑
    }}
  >
    🌐 中 / EN
  </button>

  {/* 🔒 登出按钮（统一大小 + 红色按钮） */}
  <button
    onClick={() => {
      document.cookie =
        "sky_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      router.push("/");
    }}
    className="flex items-center justify-center w-25 gap-2 px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition duration-200"
  >
    <LogOut size={16} />
    <span>登出</span>
  </button>
</div>

        </header>

        {/* 页面内容 */}
        <main className="p-6 bg-gray-50 flex-1">{children}</main>
      </div>
    </div>
  );
}
  