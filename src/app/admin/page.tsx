import { Metadata } from 'next';

import { getProducts } from '@/store/products/productsOperations';

import Admin from '@/components/Admin/Admin';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка',
};

export default async function AdminPage() {
  const products = await getProducts();

  return <Admin products={products} />;
}
