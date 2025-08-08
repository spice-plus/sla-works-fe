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
  webpack: (config, { isServer, dev }) => {
    // 根本的解決策: tar-fsモジュール解決問題の完全解決

    // Sharp関連モジュールの外部化（サーバーサイドのみ）
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push(({ request }, callback) => {
        // Sharpとその内部依存関係を外部化
        if (
          request === "sharp" ||
          request === "tar-fs" ||
          request === "tar-stream" ||
          request.startsWith("sharp/")
        ) {
          return callback(null, `commonjs ${request}`);
        }
        callback();
      });
    }

    // モジュール解決の設定
    config.resolve = config.resolve || {};

    // tar-fsの解決問題を根本的に解決
    config.resolve.alias = {
      ...config.resolve.alias,
      // tar-fsを無効化（Sharpの内部依存関係として処理）
      "tar-fs": false,
    };

    // クライアントサイドでのfallback設定
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        sharp: false,
        "tar-fs": false,
        "tar-stream": false,
        "tunnel-agent": false,
        "node-gyp": false,
        "prebuild-install": false,
        // Node.js core modules
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        util: false,
        http: false,
        https: false,
        url: false,
        assert: false,
        buffer: false,
        events: false,
        querystring: false,
        zlib: false,
      };
    }

    // キャッシュ設定の最適化（完全無効化ではなく、問題のあるモジュールのみ除外）
    if (!dev) {
      config.cache = {
        type: "filesystem",
        version: "2.0.0", // バージョンを上げてキャッシュをリセット
        buildDependencies: {
          config: [__filename],
        },
        // tar-fsとSharp関連モジュールをキャッシュから除外
        managedPaths: [
          /^(.+[\\/])?node_modules[\\/](?!(sharp|tar-fs|tar-stream|tunnel-agent))/,
        ],
      };
    }

    // 問題のあるモジュールに関する警告を抑制
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      /Module not found: Error: Can't resolve 'tar-fs'/,
      /Module not found: Error: Can't resolve 'tunnel-agent'/,
      /Critical dependency: the request of a dependency is an expression/,
    ];

    return config;
  },
  // Remove experimental.esmExternals as it's deprecated in Next.js 15
  // The webpack configuration above handles module resolution more effectively
};

module.exports = nextConfig;
