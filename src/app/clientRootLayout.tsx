'use client';

import { useEffect } from 'react';

import { usePathname } from 'next/navigation';

import { checkCart } from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import { checkFavorites } from '@/store/products/productsSlice';
import { APIProvider } from '@vis.gl/react-google-maps';

import { Addresses } from '@/components/Addresses';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { TabNavigator } from '@/components/layout/TabNavigator';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';

import css from './clientRootLayout.module.scss';

export default function ClientRootLayout({
  products,
  children,
}: Readonly<{
  products: Product[];
  children: React.ReactNode;
}>) {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;

  const pathname = usePathname();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products.length > 0) {
      dispatch(checkFavorites(products));
      dispatch(checkCart(products));
    }
  }, [dispatch, products]);

  return (
    <APIProvider apiKey={API_KEY}>
      <div className={css.wrapper}>
        <Header />
        <main className={css.main}>
          <Section>
            <Container>{children}</Container>
          </Section>
          {!pathname.includes('/admin') && <Addresses />}
          <TabNavigator />
        </main>
        <Footer />
      </div>
    </APIProvider>
  );
}
