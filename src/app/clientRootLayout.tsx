'use client';

import { Provider } from 'react-redux';

import { persist, store } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import { Addresses } from '@/components/Addresses';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { TabNavigator } from '@/components/TabNavigator';
import { WelcomeLogo } from '@/components/WelcomeLogo';

import css from './clientRootLayout.module.scss';

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <PersistGate loading={<WelcomeLogo />} persistor={persist}>
        <div className={css.wrapper}>
          <Header />
          <main className={css.main}>
            {children}
            <Addresses />
            <TabNavigator />
          </main>
          <Footer />
        </div>
      </PersistGate>
    </Provider>
  );
}
