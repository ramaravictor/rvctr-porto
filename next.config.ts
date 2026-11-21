import type { NextConfig } from "next";

// Static export: `next build` writes a plain HTML/CSS/JS site to `out/`,
// ready for Cloudflare Pages (no server or Workers runtime needed).
const nextConfig: NextConfig = {
  output: "export",
  // next/image's optimizer needs a server; images in public/ are already web-sized.
  images: { unoptimized: true },
};

export default nextConfig;
