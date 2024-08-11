'use client';

import { PropsWithChildren } from 'react';

import css from './Layout.module.scss';
import { Addresses } from './components/Addresses';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TabNavigator } from './components/TabNavigator';

interface LayoutProps extends PropsWithChildren {}

export function Layout({ children }: LayoutProps) {
  return (
    <div className={css.wrapper}>
      <Header />
      <main className={css.main}>
        {children}
        <Addresses />
        <TabNavigator />
      </main>
      <Footer />
    </div>
  );
}
