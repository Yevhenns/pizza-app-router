import type { Metadata } from 'next';
import ClientRootLayout from './clientRootLayout';
import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Nostra Pizza',
  description: 'Піца в місті Дніпро, Nostra-Pizza, доставка піци в Дніпрі',
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
