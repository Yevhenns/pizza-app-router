import { Metadata } from 'next';

import { ProductsList } from '@/components/ProductsList';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Напої',
};

export default async function Drinks() {
  return <ProductsList category="Напої" />;
}
