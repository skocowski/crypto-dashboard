/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.alchemyapi.io",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "assets.coingecko.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig
