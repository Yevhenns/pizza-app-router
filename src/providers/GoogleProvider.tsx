'use client';

import { useEffect } from 'react';

// import { registerServiceWorker } from '@/register-service-worker';
import { APIProvider } from '@vis.gl/react-google-maps';

export function GoogleProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;

  // useEffect(() => {
  //   registerServiceWorker();
  // }, []);

  return <APIProvider apiKey={API_KEY}>{children}</APIProvider>;
}
