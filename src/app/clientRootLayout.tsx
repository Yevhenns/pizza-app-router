'use client';

import { APIProvider } from '@vis.gl/react-google-maps';

import { Addresses } from '@/components/Addresses';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PagesWrapper } from '@/components/PagesWrapper';
import { TabNavigator } from '@/components/TabNavigator';

import css from './clientRootLayout.module.scss';

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;

  return (
    <APIProvider apiKey={API_KEY}>
      <div className={css.wrapper}>
        <Header />
        <main className={css.main}>
          <PagesWrapper>{children}</PagesWrapper>
          <Addresses />
          <TabNavigator />
        </main>
        <Footer />
      </div>
    </APIProvider>
  );
}
