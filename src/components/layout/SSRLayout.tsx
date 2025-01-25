import { Addresses } from '@/components/Addresses';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { TabNavigator } from '@/components/layout/TabNavigator';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';

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
        <Section>
          <Container>{children}</Container>
        </Section>
        <Addresses />
        <TabNavigator />
      </main>
      <Footer />
    </div>
  );
}
