import { Metadata } from 'next';

import {
  getProducts,
  getSupplements,
} from '@/store/products/productsOperations';

import { Cart } from '@/components/Cart/Cart';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Кошик',
};

export default async function CartPage() {
  const products = await getProducts();
  const supplements = await getSupplements();

  return (
    <SectionContainer>
      <Cart products={products} supplements={supplements} />
    </SectionContainer>
  );
}
