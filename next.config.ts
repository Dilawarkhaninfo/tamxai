import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'edeviser.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
