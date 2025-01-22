import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Comfortaa, Inter } from 'next/font/google';

import { GoogleOAuthProvider } from '@react-oauth/google';

import ReduxProvider from './ReduxProvider';
import ClientRootLayout from './clientRootLayout';
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
  title: 'Nostra Pizza',
  description: 'Піца в місті Дніпро, Nostra-Pizza, доставка піци в Дніпрі',
  openGraph: {
    title: 'Nostra Pizza',
    description: 'Піца в місті Дніпро, Nostra-Pizza, доставка піци в Дніпрі',
    url: 'https://nostrra-pizzza.vercel.app',
    siteName: 'Nostra Pizza',
    images: [
      {
        url: 'https://nostrra-pizzza.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdyka4vajb%2Fimage%2Fupload%2Fv1698576734%2Fhatamagnata%2Fpizzas%2Fcmzbifr7ssgugxtgnrtn.png&w=256&q=75',
        width: 400,
        height: 400,
      },
    ],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const CLIENTID = process.env.CLIENTID as string;

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
            <ClientRootLayout>
              {children}
              <ToastContainer />
            </ClientRootLayout>
          </ReduxProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
