import { Metadata } from 'next';

import {
  getProducts,
  getSupplements,
} from '@/store/products/productsOperations';

import Favorite from '@/components/Favorite/Favorite';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Улюблене',
};

export default async function FavoritePage() {
  const products = await getProducts();
  const supplements = await getSupplements();

  return <Favorite products={products} supplements={supplements} />;
}
