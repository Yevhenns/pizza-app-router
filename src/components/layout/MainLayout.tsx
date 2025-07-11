import { Footer } from '@/components/layout/Footer/Footer';
import { Header } from '@/components/layout/Header/Header';
import { TabNavigator } from '@/components/layout/TabNavigator/TabNavigator';

import InstallPrompt from './InstallPrompt/InstallPrompt';
import css from './MainLayout.module.scss';

export default function MainLayout({
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
        <InstallPrompt />
      </main>
      <Footer />
    </div>
  );
}
