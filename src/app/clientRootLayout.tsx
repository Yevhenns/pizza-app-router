'use client';

import { Provider } from 'react-redux';

import { persist, store } from '@/redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import { Layout } from '@/components/Layout';
import { WelcomeLogo } from '@/components/Layout/components/WelcomeLogo';

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <PersistGate loading={<WelcomeLogo />} persistor={persist}>
        <Layout>{children}</Layout>
      </PersistGate>
    </Provider>
  );
}
