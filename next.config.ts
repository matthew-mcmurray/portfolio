import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a plain static site into /out (handy for previews).
// On Vercel you don't need it — just push and it deploys.
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(staticExport && { output: "export", images: { unoptimized: true } }),
};

export default nextConfig;
