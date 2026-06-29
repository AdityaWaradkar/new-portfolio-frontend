import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ik.imagekit.io'],
  },
  output: 'standalone',
  poweredByHeader: false,
};

export default nextConfig;