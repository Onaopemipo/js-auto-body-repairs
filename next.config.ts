import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    webVitalsAttribution: ["CLS", "LCP"],
  },

  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
