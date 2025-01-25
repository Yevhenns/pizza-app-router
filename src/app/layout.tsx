import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Comfortaa, Inter } from 'next/font/google';

import { getProducts } from '@/store/products/productsOperations';
import { GoogleOAuthProvider } from '@react-oauth/google';

import ClientRootLayout from '../components/layout/RootLayout';
import { GoogleProvider } from '../providers/GoogleProvider';
import ReduxProvider from '../providers/ReduxProvider';
import './globals.scss';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--secondary-font',
  display: 'swap',
  weight: '400',
});

export const roboto_mono = Comfortaa({
  subsets: ['latin'],
  variable: '--main-font',
  display: 'swap',
  weight: '600',
});

export const metadata: Metadata = {
  description: 'Піца в місті Дніпро, Nostra-Pizza, доставка піци в Дніпрі',
  openGraph: {
    title: 'Nostra Pizza',
    description: 'Піца в місті Дніпро, Nostra-Pizza, доставка піци в Дніпрі',
    url: 'https://nostrra-pizzza.vercel.app',
    siteName: 'Nostra Pizza',
    images: [
      {
        url: 'https://res.cloudinary.com/dyka4vajb/image/upload/v1698576734/hatamagnata/pizzas/cmzbifr7ssgugxtgnrtn.png',
        width: 400,
        height: 400,
      },
    ],
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const CLIENTID = process.env.CLIENTID as string;

  const products = await getProducts();

  return (
    <html lang="uk" className={`${inter.variable} ${roboto_mono.variable}`}>
      <head>
        <meta
          name="google-site-verification"
          content="7ThJ8TZQqdaICo-gIgrqtzRaxDg5yHsr4Xi0LgGaHDM"
        />
      </head>
      <body>
        <GoogleOAuthProvider clientId={CLIENTID}>
          <ReduxProvider>
            <GoogleProvider products={products}>
              <ClientRootLayout>
                {children}
                <ToastContainer />
              </ClientRootLayout>
            </GoogleProvider>
          </ReduxProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
