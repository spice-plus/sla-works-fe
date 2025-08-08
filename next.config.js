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
    // Sharp and related modules optimization for server-side rendering
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push(({ context, request }, callback) => {
        // Handle Sharp and its internal dependencies
        if (request.startsWith('sharp') ||
            request === 'tar-fs' ||
            request === 'tar-stream' ||
            request === 'tunnel-agent' ||
            request.includes('node-gyp') ||
            request.includes('prebuild')) {
          return callback(null, `commonjs ${request}`);
        }
        callback();
      });
    }

    // Comprehensive module resolution fallbacks
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...config.resolve.fallback,
      // Sharp related modules
      'tar-fs': false,
      'tar-stream': false,
      'tunnel-agent': false,
      'node-gyp': false,
      'prebuild-install': false,
      // Node.js core modules
      'http': false,
      'https': false,
      'url': false,
      'assert': false,
      'stream': false,
      'util': false,
      'fs': false,
      'path': false,
      'os': false,
      'crypto': false,
      'buffer': false,
      'events': false,
      'querystring': false,
      'zlib': false,
    };

    // Enhanced caching configuration
    if (!dev) {
      config.cache = {
        ...config.cache,
        type: 'filesystem',
        version: '1.0.0',
        buildDependencies: {
          config: [__filename],
        },
        // Prevent cache corruption for problematic modules
        managedPaths: [/^(.+[\\/])?node_modules[\\/](?!(sharp|tar-fs|tunnel-agent))/],
      };
    }

    // Ignore specific warnings for known issues
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      /Module not found: Error: Can't resolve 'tar-fs'/,
      /Module not found: Error: Can't resolve 'tunnel-agent'/,
      /Critical dependency: the request of a dependency is an expression/,
    ];

    // Optimization for Sharp and image processing
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization?.splitChunks,
        cacheGroups: {
          ...config.optimization?.splitChunks?.cacheGroups,
          sharp: {
            test: /[\\/]node_modules[\\/](sharp|tar-fs|tunnel-agent)[\\/]/,
            name: 'sharp-vendor',
            chunks: 'all',
            priority: 20,
          },
        },
      },
    };

    return config;
  },
  // Remove experimental.esmExternals as it's deprecated in Next.js 15
  // The webpack configuration above handles module resolution more effectively
};

module.exports = nextConfig;
