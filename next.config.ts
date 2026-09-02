import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/admin/:path*',
        destination: 'https://app.skditumudah.com/admin/:path*',
        permanent: false,
      },
      {
        source: '/tryout',
        destination: 'https://app.skditumudah.com/tryout/cpns',
        permanent: true,
      },
      {
        source: '/tryout/:path*',
        destination: 'https://app.skditumudah.com/tryout/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
