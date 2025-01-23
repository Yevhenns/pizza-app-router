'use client';

import { usePathname } from 'next/navigation';

import { APIProvider } from '@vis.gl/react-google-maps';

import { Addresses } from '@/components/Addresses';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { PagesWrapper } from '@/components/layout/PagesWrapper';
import { TabNavigator } from '@/components/layout/TabNavigator';

import css from './clientRootLayout.module.scss';

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;

  const pathname = usePathname();

  return (
    <APIProvider apiKey={API_KEY}>
      <div className={css.wrapper}>
        <Header />
        <main className={css.main}>
          <PagesWrapper>{children}</PagesWrapper>
          {!pathname.includes('/admin') && <Addresses />}
          <TabNavigator />
        </main>
        <Footer />
      </div>
    </APIProvider>
  );
}
