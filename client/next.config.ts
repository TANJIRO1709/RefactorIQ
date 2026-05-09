import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/review/:path*',
        destination: 'http://localhost:5000/api/review/:path*',
      },
      {
        source: '/api/stream/:path*',
        destination: 'http://localhost:5000/api/stream/:path*',
      },
    ]
  },
};

export default nextConfig;