/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // シンプルな解決策: Sharp関連モジュールの外部化（サーバーサイドのみ）
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push("sharp");
    }

    return config;
  },
};

module.exports = nextConfig;
