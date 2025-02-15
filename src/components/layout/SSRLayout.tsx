import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { TabNavigator } from '@/components/layout/TabNavigator';

import css from './SSRLayout.module.scss';

export default function SSRLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={css.wrapper}>
      <Header />
      <main className={css.main}>
        {children}
        <TabNavigator />
      </main>
      <Footer />
    </div>
  );
}
