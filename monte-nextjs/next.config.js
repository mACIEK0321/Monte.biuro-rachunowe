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
