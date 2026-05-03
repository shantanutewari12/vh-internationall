import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.indianshelf.in",
      },
      {
        protocol: "https",
        hostname: "www.indianartvilla.in",
      },
      {
        protocol: "https",
        hostname: "cdn.exoticindia.com",
      },
      {
        protocol: "https",
        hostname: "vedanshcraft.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
