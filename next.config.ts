import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/admin/:path*',
        destination: 'https://app.skditumudah.com/admin/:path*',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
