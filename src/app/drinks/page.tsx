import { Metadata } from 'next';

import { fetchProductsByCategory } from '@/store/products/productsOperations';

import { ProductsList } from '@/components/ProductsList/ProductsList';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

const title = 'Напої';

export const metadata: Metadata = {
  title: `Nostra Pizza | ${title}`,
};

export default async function Drinks() {
  const products = await fetchProductsByCategory('drinks');

  return (
    <SectionContainer>
      <h1>{title}</h1>
      <ProductsList products={products} />
    </SectionContainer>
  );
}
