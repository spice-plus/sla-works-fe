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
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
  // Webpack設定を削除 - Next.jsのデフォルトに任せる
  async redirects() {
    return [
      // 旧URL形式から新URL形式へのリダイレクト
      {
        source: "/articles",
        has: [
          {
            type: "query",
            key: "prefecture",
            value: "(?<prefecture>.*)",
          },
          {
            type: "query",
            key: "category",
            value: "(?<category>.*)",
          },
        ],
        destination: "/articles/:prefecture/:category",
        permanent: true,
      },
      {
        source: "/articles",
        has: [
          {
            type: "query",
            key: "prefecture",
            value: "(?<prefecture>.*)",
          },
        ],
        destination: "/articles/:prefecture",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
