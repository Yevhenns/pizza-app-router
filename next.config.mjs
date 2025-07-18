/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa";

import path from 'path';

const nextConfig = {  
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    WEATHER_API_KEY: process.env.WEATHER_API_KEY,
    CLIENTID: process.env.CLIENTID,
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
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['mongoose'],
  },
  sassOptions: {
    prependData: `@import "src/assets/styles/media.mixin.scss";`,
  },
  webpack(config) {
    config.resolve.alias['handlebars'] = path.resolve(
      './node_modules/handlebars/dist/handlebars.js'
    );
    return config;
  },
};

export default withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})(nextConfig);
