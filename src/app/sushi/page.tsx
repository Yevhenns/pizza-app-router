import { Metadata } from 'next';

import { ProductsList } from '@/components/ProductsList';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Суші',
};

export default async function Sushi() {
  return (
    <SectionContainer>
      <h1>Суші</h1>
      <ProductsList category="Суші" />
    </SectionContainer>
  );
}
