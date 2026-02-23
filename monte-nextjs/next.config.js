/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
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
        source: '/:path*',
        has: [{ type: 'host', value: 'montebiuro.pl' }],
        destination: 'https://www.montebiuro.pl/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
