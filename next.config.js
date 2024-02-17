/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i3.ytimg.com", "img.youtube.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
