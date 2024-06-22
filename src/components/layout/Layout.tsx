'use client';
import { PropsWithChildren } from 'react';
import { TabNavigator } from './components/TabNavigator';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Addresses } from './components/Addresses';
import css from './Layout.module.scss';

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
