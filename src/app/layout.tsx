import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';

import SavedProductsProvider from '@/providers/SavedProductsProvider';
import { fetchProductsIdList } from '@/store/products/productsOperations';
import { GoogleOAuthProvider } from '@react-oauth/google';

import MainLayout from '../components/layout/MainLayout';
import { GoogleProvider } from '../providers/GoogleProvider';
import ReduxProvider from '../providers/ReduxProvider';
import './globals.scss';

export const nunito = Nunito({
  subsets: ['latin'],
  variable: '--main-font',
  display: 'swap',
  weight: '400',
});

export const metadata: Metadata = {
  manifest: './manifest.ts',
  description:
    'Піца в місті Дніпро: Nostra-Pizza – швидка доставка смачної піци в Дніпрі.',
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

  const allproductsIdList = await fetchProductsIdList();

  return (
    <html lang="uk">
      <head>
        <meta
          name="google-site-verification"
          content="7ThJ8TZQqdaICo-gIgrqtzRaxDg5yHsr4Xi0LgGaHDM"
        />
        <meta
          httpEquiv="Cross-Origin-Opener-Policy"
          content="same-origin-allow-popups"
        />
        <meta name="keywords" content="Піца, Закуски, Напої, Дніпро" />
      </head>
      <body className={nunito.className}>
        <GoogleOAuthProvider clientId={CLIENTID}>
          <ReduxProvider>
            <GoogleProvider>
              <SavedProductsProvider allproductsIdList={allproductsIdList}>
                <MainLayout>
                  {children}
                  <ToastContainer />
                </MainLayout>
              </SavedProductsProvider>
            </GoogleProvider>
          </ReduxProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
