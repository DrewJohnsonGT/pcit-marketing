import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Avoids conflicting paths with the main app
  assetPrefix: `${process.env.NEXT_PUBLIC_MARKETING_URL}`,
  devIndicators: false,
  async headers() {
    // Allows the main app rewrites to access the marketing app resources
    return [
      {
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NEXT_PUBLIC_APP_URL,
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
        ],
        source: '/_next/static/:path*',
      },
    ];
  },
  // Re-writes all non-root "/" routes to the main app
  async rewrites() {
    return [
      {
        destination: `${process.env.NEXT_PUBLIC_APP_URL}/:path*`,
        source: '/:path*',
      },
    ];
  },
};

export default nextConfig;
