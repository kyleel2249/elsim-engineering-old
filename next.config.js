const path = require('path');

/**
 * ELSIM Engineering — Next.js configuration.
 *
 * Two build targets:
 *  - default (`npm run build` off-platform) : full Next server build, API routes live.
 *  - static (`npm run build:cf`, or automatically on Cloudflare Pages):
 *    `output: 'export'` into out/.
 *
 * The static target cannot include route handlers, so
 * scripts/prepare-static-export.mjs moves app/api aside for the duration of
 * the build and puts it back afterwards. The API is preserved, not deleted.
 */

const isStaticExport = process.env.CF_PAGES_STATIC === '1';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  ...(isStaticExport
    ? {
        output: 'export',
        trailingSlash: true,
        images: { unoptimized: true },
        // Inlined into lib/site.ts so sitemap/canonical URLs always match the
        // trailing-slash routing above, however the build was started.
        env: { NEXT_PUBLIC_STATIC_EXPORT: '1' },
      }
    : {
        images: {
          formats: ['image/avif', 'image/webp'],
          minimumCacheTTL: 60 * 60 * 24 * 365,
          remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'res.cloudinary.com' },
            { protocol: 'https', hostname: 'imagedelivery.net' },
          ],
        },
      }),

  eslint: { ignoreDuringBuilds: true },
  transpilePackages: ['three'],

  webpack: (config) => {
    // Air-gapped / offline builds: swap the Google Fonts loader for a system
    // font stack so a fonts.googleapis.com outage cannot fail the build.
    if (process.env.OFFLINE_FONTS === '1') {
      const offline = path.resolve(__dirname, 'lib/fonts.offline.ts');
      // Alias the import *request* (with `$` for an exact match) rather than
      // the resolved path — path-keyed aliases are not reliably applied across
      // every compilation pass, and the export build has more than one.
      config.resolve.alias = {
        ...config.resolve.alias,
        '@/lib/fonts$': offline,
        [path.resolve(__dirname, 'lib/fonts.ts')]: offline,
      };
    }
    return config;
  },

  // Security headers. Ignored by `output: 'export'` — the equivalent live in
  // public/_headers for Cloudflare Pages.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

module.exports = nextConfig;
