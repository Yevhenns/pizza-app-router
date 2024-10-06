import { Addresses } from '@/components/Addresses';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { PagesWrapper } from '@/components/PagesWrapper';
import { TabNavigator } from '@/components/TabNavigator';

import css from './clientRootLayout.module.scss';

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={css.wrapper}>
      <Header />
      <main className={css.main}>
        <PagesWrapper>{children}</PagesWrapper>
        <Addresses />
        <TabNavigator />
      </main>
      <Footer />
    </div>
  );
}
