
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Cloudinary — uploaded avatars
      { protocol: "https", hostname: "res.cloudinary.com" },
      // Google OAuth profile pictures
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;