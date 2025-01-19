import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'iip-thumb.smk.dk',
      },
      {
        protocol: 'https',
        hostname: 'api.smk.dk',
      }
    ],
},
};

export default nextConfig;
