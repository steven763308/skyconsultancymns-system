"use client";
//import { useEffect } from "react";
//import { useRouter } from "next/navigation";
import Image from "next/image";

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
      <h2 className="text-2xl font-bold text-center mb-6">Government Portal</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* CIDB */}
        <a
          href="https://cims.cidb.gov.my"
          target="_blank"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition flex flex-col items-center text-center"
        >
          {/* ✅ 圆形 Logo */}
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border border-gray-200">
            <Image
              src="/image/cidbLogo.png"
              alt="CIDB Logo"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
          {/* 标题 + 描述 */}
          <h2 className="text-xl font-semibold mb-2">CIDB CIMS 系统</h2>
          <p className="text-sm text-gray-600">
            注册公司、升级等级、管理 G1-G7
          </p>
        </a>

        {/* ESD */}
        <a
          href="https://esd.imi.gov.my"
          target="_blank"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition flex flex-col items-center text-center"
        >
          {/* ✅ 圆形 Logo */}
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border border-gray-200">
            <Image
              src="/image/expatriateLogo.png"
              alt="ESD Logo"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
          {/* 标题 + 描述 */}
          <h2 className="text-xl font-semibold mb-2">ESD 外籍雇员系统</h2>
          <p className="text-sm text-gray-600">
            EP 配额、聘请申请、公司注册
          </p>
        </a>

        {/* MyHelp */}
        <a
          href="https://myhelp.imi.gov.my"
          target="_blank"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition flex flex-col items-center text-center"
        >
          {/* ✅ 圆形 Logo */}
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border border-gray-200">
            <Image
              src="/image/jimLogo.png"
              alt="ESD Logo"
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          </div>
          {/* 标题 + 描述 */}
          <h2 className="text-xl font-semibold mb-2">ESD 外籍雇员系统</h2>
          <p className="text-sm text-gray-600">
            EP 配额、聘请申请、公司注册
          </p>
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

      <h2 className="text-2xl font-bold text-center mb-6">SCMNS Tool</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {/* Banking */}
        <a
          href="https://www.cimboctobiz.com.my/digital/web/gl/bfo/login"
          target="_blank"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">CIMB Octo Biz</h2>
          <p className="text-sm text-gray-600">Company Bank Portal</p>
        </a>

        {/* MetaSuite */}
        <a
          href="https://business.facebook.com/latest/home?"
          target="_blank"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">Meta Business Suite</h2>
          <p className="text-sm text-gray-600">Facebook Page Manage</p>
        </a>

        {/* Website Enquiry */}
        <a
          href="https://formspree.io/"
          target="_blank"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-2">Website Enquiry</h2>
          <p className="text-sm text-gray-600">Website Enquiry Submission</p>
        </a>
      </div>
    </main>
  );
}
