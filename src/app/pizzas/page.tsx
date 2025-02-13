import { Metadata } from 'next';

import { ProductsList } from '@/components/ProductsList';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Піца',
};

export default async function Pizzas() {
  return (
    <SectionContainer>
      <h1>Піца</h1>
      <ProductsList category="Піца" />
    </SectionContainer>
  );
}
