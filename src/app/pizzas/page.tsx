import { Metadata } from 'next';

import { ProductsList } from '@/components/ProductsList';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Піца',
};

export default async function Pizzas() {
  return <ProductsList category="pizzas" />;
}
