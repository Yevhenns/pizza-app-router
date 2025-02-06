import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js PWA',
    short_name: 'NextPWA',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: './favicon.ico',
        sizes: '192x192',
        type: 'image/ico',
      },
      {
        src: './favicon.icog',
        sizes: '512x512',
        type: 'image/ico',
      },
    ],
  };
}
