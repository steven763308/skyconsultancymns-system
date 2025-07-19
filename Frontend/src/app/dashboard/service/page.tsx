"use client";
import { useEffect } from "react";

export default function Services() {
  return (
    <main>
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          🛠️ Sky Consultancy 工具面板
        </h1>

        {/* 网格布局 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <a
              key={index}
              href={service.link}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all p-6 border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {service.title}
              </h2>
              <p className="text-sm text-gray-600">{service.description}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

// 工具清单数据
const services = [
  {
    title: "CIDB CIMS 系统",
    link: "https://cims.cidb.gov.my",
    description: "注册公司、升级等级、管理 G1-G7",
  },
  {
    title: "ESD 外籍雇员系统",
    link: "https://esd.imi.gov.my",
    description: "EP 配额、聘请申请、公司注册",
  },
  {
    title: "MyHelp 系统",
    link: "https://myhelp.imi.gov.my",
    description: "线上预约、递交文件与备案",
  },
  {
    title: "MyKKP 工地备案",
    link: "https://mykkp.dosh.gov.my",
    description: "JKKP / PEMTK 系统，项目备案与申请",
  },
];
