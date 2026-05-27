/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],

    remotePatterns: [
      {
        protocol: "https",
        hostname: "vereda.co.in",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.vereda.co.in",
        pathname: "/**",
      },
    ],

    unoptimized: true,
  },
};

module.exports = nextConfig;