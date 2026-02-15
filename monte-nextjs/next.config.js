/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'montebiuro.pl',
        pathname: '/cms/**',
      },
      {
        protocol: 'https',
        hostname: 'montebiuro.pl',
        pathname: '/wp-content/**',
      },
    ],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
