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
