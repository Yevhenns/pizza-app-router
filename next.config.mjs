/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    CLIENTID: process.env.CLIENTID,
    NEXT_PUBLIC_BASE_URL_NEST: process.env.NEXT_PUBLIC_BASE_URL_NEST,
    ADMIN_ID: process.env.ADMIN_ID,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['mongoose'],
  },
};

export default nextConfig;
