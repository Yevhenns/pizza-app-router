'use client';

import React, { PropsWithChildren } from 'react';
import css from './Layout.module.scss';
import { TabNavigator } from './components/TabNavigator';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Addresses } from './components/Addresses';

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
