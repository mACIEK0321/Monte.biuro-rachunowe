const seoRedirects = require('./seo-redirects.cjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  trailingSlash: true,
  async redirects() {
    return [
      ...seoRedirects,
      // Preserve links to the HTML site after the migration to Next.js.
      ...[
        ['/index.html', '/'],
        ['/polityka-prywatnosci.html', '/polityka-prywatnosci/'],
        ['/regulamin.html', '/regulamin/'],
      ].map(([source, path]) => ({
        source,
        destination: `https://www.montebiuro.pl${path}`,
        permanent: true,
      })),
      {
        source: '/',
        has: [{ type: 'host', value: 'montebiuro.pl' }],
        destination: 'https://www.montebiuro.pl/',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'montebiuro.pl' }],
        destination: 'https://www.montebiuro.pl/:path*/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
