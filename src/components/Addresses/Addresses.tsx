'use client';

import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';

import css from './Addresses.module.scss';
import { AddressesLinks } from './AddressesLinks';
import { GoogleMap } from './GoogleMap';

export function Addresses() {
  return (
    <Section>
      <Container>
        <h2 className={'sectionTitle'}>Наші адреси</h2>
        <div className={css.wrapper}>
          <AddressesLinks />
          <GoogleMap />
        </div>
      </Container>
    </Section>
  );
}
