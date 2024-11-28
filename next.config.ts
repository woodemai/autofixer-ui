import type { NextConfig } from "next";

import "./src/env.js";

const config = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "200mb",
    },
  },
} satisfies NextConfig;

export default config;
