import { Metadata } from 'next';

import { ProductsList } from '@/components/ProductsList';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Напої',
};

export default async function Drinks() {
  return (
    <SectionContainer>
      <h1>Напої</h1>
      <ProductsList category="Напої" />
    </SectionContainer>
  );
}
