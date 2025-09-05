import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "via.placeholder.com"],
  },
  experimental: {
    mdxRs: true,
  },
  // PWA configuration will be handled by a custom service worker
  // For now, we'll use the manifest and basic PWA features
};

export default nextConfig;
