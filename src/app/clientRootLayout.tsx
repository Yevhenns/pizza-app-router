'use client';
import { persist, store } from '@/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Layout } from '@/components/layout';
import { WelcomeLogo } from '@/components/layout/components/WelcomeLogo';

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
