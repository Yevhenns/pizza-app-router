import { Metadata } from 'next';

import {
  getProducts,
  getSupplements,
} from '@/store/products/productsOperations';

import Cart from '@/components/Cart/Cart';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Кошик',
};

export default async function CartPage() {
  const products = await getProducts();
  const supplements = await getSupplements();

  return <Cart products={products} supplements={supplements} />;
}
