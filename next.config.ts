import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No complex webpack logic needed if isolation is correct
  serverExternalPackages: ["mysql2", "ioredis"],
};

export default nextConfig;
