"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import {
  Pin,
  PinOff,
  LogOut,
  Home,
  Monitor,
  LayoutDashboard,
  UserCog,
  Bolt,
  Menu,
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
    { label: "Draft", href: "/dashboard/draftzone", icon: <Home size={18} /> },
    { label: "Services", href: "/dashboard/service", icon: <Monitor size={18} /> },
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
            className={`py-2 px-2 rounded mb-2 hover:bg-gray-700 flex items-center transition-all duration-200 ${
              pathname === link.href ? "bg-gray-700" : ""
            }`}
          >
            <span className="mr-2">{link.icon}</span>
            {!isCollapsed && (!isMobile || isSidebarOpen) && <span>{link.label}</span>}
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
          <div className="flex items-center gap-2">
            {/* 🔁 Language Switch Placeholder */}
            <button className="bg-gray-200 text-sm px-3 py-1 rounded hover:bg-gray-300">
              中 / EN
            </button>
            {/* ✅ 登出 */}
            <button
              className="bg-black text-white px-4 py-2 rounded flex items-center gap-2"
              onClick={() => {
                document.cookie =
                  "sky_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
                router.push("/");
              }}
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
