import type { Metadata } from 'next';
import ClientRootLayout from './clientRootLayout';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Nostra Pizza',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>
        <ClientRootLayout>{children}</ClientRootLayout>
      </body>
    </html>
  );
}