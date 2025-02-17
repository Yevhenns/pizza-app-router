import { Metadata } from 'next';

import { fetchProductsByCategory } from '@/store/products/productsOperations';

import { ProductsList } from '@/components/ProductsList/ProductsList';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

const title = 'Піца';

export const metadata: Metadata = {
  title: `Nostra Pizza | ${title}`,
};

export default async function Pizzas() {
  const products = await fetchProductsByCategory('pizzas');

  return (
    <SectionContainer>
      <h1>{title}</h1>
      <ProductsList products={products} />
    </SectionContainer>
  );
}
