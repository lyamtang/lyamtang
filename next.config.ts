import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ["192.168.1.209"],
  compiler: {
    styledComponents: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
