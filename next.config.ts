import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No complex webpack logic needed if isolation is correct
  serverExternalPackages: ["mysql2", "ioredis"],
  devIndicators: {
    appIsrStatus: false,
  },
  experimental: {
    allowedDevOrigins: ["169.254.123.138", "localhost:3000"],
  },
};

export default nextConfig;
