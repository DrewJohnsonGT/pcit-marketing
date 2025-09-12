import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  devIndicators: false,
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
