'use client';

import { Provider } from 'react-redux';

import { persist, store } from '@/store/store';
import { PersistGate } from 'redux-persist/integration/react';

import { WelcomeLogo } from '@/components/WelcomeLogo';

export default function ReduxProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <PersistGate loading={<WelcomeLogo />} persistor={persist}>
        {children}
      </PersistGate>
    </Provider>
  );
}
