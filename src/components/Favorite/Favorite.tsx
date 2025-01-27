'use client';

import { useAppSelector } from '@/store/hooks';
import { getFavorites } from '@/store/products/productsSlice';

import { FavoriteList } from '@/components/ProductsList';
import { Empty } from '@/components/shared/Empty';

type FavoriteProps = {
  supplements: Supplement[];
};

export default function Favorite({ supplements }: FavoriteProps) {
  const favoriteProducts = useAppSelector(getFavorites);

  return (
    <>
      {favoriteProducts.length > 0 ? (
        <FavoriteList supplements={supplements} />
      ) : (
        <Empty text={'В улюбленому нічого немає!'} />
      )}
    </>
  );
}
