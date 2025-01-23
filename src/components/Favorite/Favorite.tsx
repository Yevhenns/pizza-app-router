'use client';

import { useAppSelector } from '@/store/hooks';
import { getFavorites } from '@/store/products/productsSlice';

import { FavoriteList } from '@/components/ProductsList';
import { Empty } from '@/components/shared/Empty';

export default function Favorite() {
  const favoriteProducts = useAppSelector(getFavorites);

  return (
    <>
      {favoriteProducts.length > 0 ? (
        <FavoriteList />
      ) : (
        <Empty text={'В улюбленому нічого немає!'} />
      )}
    </>
  );
}
