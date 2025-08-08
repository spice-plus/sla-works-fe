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
    // Sharp optimization for server-side rendering
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push((context, request, callback) => {
        if (request.startsWith('sharp') || request === 'tar-fs') {
          return callback(null, `commonjs ${request}`);
        }
        callback();
      });
    }

    // Resolve tunnel-agent and other potential missing modules
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'tunnel-agent': false,
      'http': false,
      'https': false,
      'url': false,
      'assert': false,
      'stream': false,
      'util': false,
    };

    // Optimize caching for sharp and related modules
    if (!dev) {
      config.cache = {
        ...config.cache,
        type: 'filesystem',
        buildDependencies: {
          config: [__filename],
        },
      };
    }

    return config;
  },
  // Experimental features for better module resolution
  experimental: {
    esmExternals: 'loose',
  },
};

module.exports = nextConfig;
