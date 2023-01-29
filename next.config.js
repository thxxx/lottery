/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "lh3.googleusercontent.com"],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: `https://z0ssobbdqh.execute-api.us-west-1.amazonaws.com/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
