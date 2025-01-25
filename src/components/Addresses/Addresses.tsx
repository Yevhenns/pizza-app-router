'use client';

import { usePathname } from 'next/navigation';

import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';

import css from './Addresses.module.scss';
import { AddressesLinks } from './AddressesLinks';
import { GoogleMap } from './GoogleMap';

export function Addresses() {
  const pathname = usePathname();

  return (
    <>
      {!pathname.includes('/admin') && (
        <Section>
          <Container>
            <div className={css.wrapper}>
              <AddressesLinks />
              <GoogleMap />
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
