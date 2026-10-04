import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Static export renders thousands of routes; keep worker memory bounded.
  experimental: { cpus: 2 },
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

export default nextConfig;
