import { Metadata } from 'next';

import Favorite from '@/components/Favorite/Favorite';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Улюблене',
};

export default async function FavoritePage() {
  return <Favorite />;
}
