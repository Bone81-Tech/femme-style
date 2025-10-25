import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable Next.js hot reload, recompiled by nodemon
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  eslint: {
    // Ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
