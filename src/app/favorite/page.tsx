import { Metadata } from 'next';

import { getSupplements } from '@/store/products/productsOperations';

import Favorite from '@/components/Favorite/Favorite';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Улюблене',
};

export default async function FavoritePage() {
  const supplements = await getSupplements();

  return <Favorite supplements={supplements} />;
}
