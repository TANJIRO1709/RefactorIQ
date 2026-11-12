import type { NextConfig } from "next";

// The browser calls the API directly at NEXT_PUBLIC_API_URL (see lib/api.js);
// no proxy rewrites, so SSE streams aren't cut by Vercel's proxy timeout.
const nextConfig: NextConfig = {};

export default nextConfig;
