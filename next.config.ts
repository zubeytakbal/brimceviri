import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/matematik",
        destination: "/bilim-hesaplayicilari/matematik",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;