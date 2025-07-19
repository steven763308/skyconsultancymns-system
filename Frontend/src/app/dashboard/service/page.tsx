"use client";
import Image from "next/image";

const tools = {
  government: [
    {
      title: "CIDB CIMS 系统",
      desc: "注册公司、升级等级、管理 G1-G7",
      url: "https://cims.cidb.gov.my",
      logo: "/image/cidbLogo.png",
    },
    {
      title: "ESD 外籍雇员系统",
      desc: "EP 配额、聘请申请、公司注册",
      url: "https://esd.imi.gov.my",
      logo: "/image/expatriateLogo.png",
    },
    {
      title: "MyHelp 系统",
      desc: "线上预约、递交文件与备案",
      url: "https://myhelp.imi.gov.my",
      logo: "/image/jimLogo.png",
    },
    {
      title: "MyKKP 工地备案",
      desc: "JKKP / PEMTK 系统，项目备案与申请",
      url: "https://mykkp.dosh.gov.my",
      logo: "/image/jkkpLogo.png",
    },
  ],
  scmns: [
    {
      title: "CIMB Octo Biz",
      desc: "Company Bank Portal",
      url: "https://www.cimboctobiz.com.my/digital/web/gl/bfo/login",
      logo: "/image/octoBizLogo.png",
    },
    {
      title: "Meta Business Suite",
      desc: "Facebook Page Manage",
      url: "https://business.facebook.com/latest/home?",
      logo: "/image/metaLogo.png",
    },
    {
      title: "Website Enquiry",
      desc: "Website Enquiry Submission",
      url: "https://formspree.io/",
      logo: "/image/formsfreeLogo.png",
    },
  ],
};

export default function Services() {
  return (
    <main className="p-8">
      {/* 页面标题与简介 */}
      <h1 className="text-3xl font-bold text-gray-800 mb-5">
        🛠️ Sky Consultancy 工具中心
      </h1>
      <p className="text-gray-600 mb-6">
        管理报价单、发票与客户付款记录，一站式查看 Sky Consultancy 的财务相关事项。
      </p>

      {/* Government Portal */}
      <Section title="📂 Government Portals" data={tools.government} />

      {/* SCMNS Tool */}
      <Section title="⚙️ SCMNS 工具" data={tools.scmns} />
    </main>
  );
}

function Section({ title, data }: { title: string; data: any[] }) {
  return (
    <section className="mb-16">
      <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {data.map((tool, index) => (
          <a
            key={index}
            href={tool.url}
            target="_blank"
            className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition-all duration-200 flex flex-col items-center text-center hover:scale-[1.02]"
          >
            <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border border-gray-200">
              <Image src={tool.logo} alt={tool.title} width={80} height={80} className="object-cover w-full h-full" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{tool.title}</h3>
            <p className="text-sm text-gray-600">{tool.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
