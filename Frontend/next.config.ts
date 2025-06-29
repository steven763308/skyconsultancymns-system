import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    //appDir: true, // ✅ 告诉 Next.js 我用了 app router 结构
  },
};

export default nextConfig;
