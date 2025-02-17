'use client';

import { useEffect, useRef } from 'react';
import { Provider } from 'react-redux';

import { createPersistor, makeStore } from '@/store/store';
import { setupListeners } from '@reduxjs/toolkit/query';
import { PersistGate } from 'redux-persist/integration/react';

import { WelcomeLogo } from '@/components/WelcomeLogo/WelcomeLogo';

export default function ReduxProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const storeRef = useRef<ReturnType<typeof makeStore> | null>(null);
  const persistorRef = useRef<ReturnType<typeof createPersistor> | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistorRef.current = createPersistor(storeRef.current);
  }

  useEffect(() => {
    const store = storeRef.current;
    if (store) {
      const unsubscribe = setupListeners(store.dispatch);
      return () => unsubscribe();
    }
  }, []);

  if (!storeRef.current || !persistorRef.current) {
    return <WelcomeLogo />;
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={<WelcomeLogo />} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
