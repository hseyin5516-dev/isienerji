/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.isienerji.com.tr',
      },
      {
        protocol: 'https',
        hostname: 'isienerji.com.tr',
      },
    ],
  },
};

export default nextConfig;
