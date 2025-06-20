/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    'https://severely-master-cicada.ngrok-free.app',
    // Add more if you use other dev URLs (e.g. localtunnel, custom domains)
  ],
};

export default nextConfig;
