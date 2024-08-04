/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    BASE_URL: process.env.BASE_URL,
    WEATHER_BASE_URL: process.env.WEATHER_BASE_URL,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    SERVER_URL: process.env.SERVER_URL,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dyka4vajb/image/upload/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.weatherapi.com',
        port: '',
      },
    ],
  },
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['mongoose'],
  },
};

export default nextConfig;
