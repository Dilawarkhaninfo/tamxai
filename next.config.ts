import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      { protocol: 'https', hostname: 'edeviser.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'ajozkyhcfuagjrgzpxyj.supabase.co' },
    ],
  },
};

export default nextConfig;
