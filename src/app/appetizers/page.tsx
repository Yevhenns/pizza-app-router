import { Metadata } from 'next';

import { ProductsList } from '@/components/ProductsList';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Закуски',
};

export default async function Appetizers() {
  return (
    <>
      <h1>Закуски</h1>
      <ProductsList category="Закуски" />
    </>
  );
}
