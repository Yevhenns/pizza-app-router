import { Metadata } from 'next';

import Cart from '@/components/Cart/Cart';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Кошик',
};

export default async function CartPage() {
  return <Cart />;
}
