import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["@repo/ui"],
  },

  // Configure Turbopack for Next.js 16
  turbopack: {
    resolveAlias: {
      "@repo/config": require("path").resolve(__dirname, "../../packages/config/src"),
      "@repo/database": require("path").resolve(__dirname, "../../packages/database/src"),
      "@repo/types": require("path").resolve(__dirname, "../../packages/types/src"),
      "@repo/ui": require("path").resolve(__dirname, "../../packages/ui/src"),
      "@repo/utils": require("path").resolve(__dirname, "../../packages/utils/src"),
      "@repo/validation": require("path").resolve(__dirname, "../../packages/validation/src"),
    },
  },

  // Configure images for better performance
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable compression
  compress: true,

  // Configure headers for security
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

