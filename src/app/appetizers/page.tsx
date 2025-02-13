import { Metadata } from 'next';

import { ProductsList } from '@/components/ProductsList';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Закуски',
};

export default async function Appetizers() {
  return (
    <SectionContainer>
      <h1>Закуски</h1>
      <ProductsList category="Закуски" />
    </SectionContainer>
  );
}
