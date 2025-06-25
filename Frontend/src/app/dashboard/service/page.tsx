"use client";
//import { useEffect } from "react";
//import { useRouter } from "next/navigation";

export default function Home() {
  /*
  const router = useRouter();

  useEffect(() => {
    const loggedIn = localStorage.getItem("sky_logged_in");
    if (loggedIn !== "true") {
      router.push("/");
    }
  }, []);
  */

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Sky Consultancy 工具面板</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* CIDB */}
        <a
          href="https://cims.cidb.gov.my"
          target="_blank"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">CIDB CIMS 系统</h2>
          <p className="text-sm text-gray-600">注册公司、升级等级、管理 G1-G7</p>
        </a>

        {/* ESD */}
        <a
          href="https://esd.imi.gov.my"
          target="_blank"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">ESD 外籍雇员系统</h2>
          <p className="text-sm text-gray-600">EP 配额、聘请申请、公司注册</p>
        </a>

        {/* MyHelp */}
        <a
          href="https://myhelp.imi.gov.my"
          target="_blank"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">MyHelp 系统</h2>
          <p className="text-sm text-gray-600">线上预约、递交文件与备案</p>
        </a>

        {/* MyKKP */}
        <a
          href="https://mykkp.dosh.gov.my"
          target="_blank"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">MyKKP 工地备案</h2>
          <p className="text-sm text-gray-600">JKKP / PEMTK 系统，项目备案与申请</p>
        </a>
      </div>
    </main>
  );
}
