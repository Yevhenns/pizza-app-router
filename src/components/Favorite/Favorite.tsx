'use client';

import { useAppSelector } from '@/store/hooks';
import { getFavorites } from '@/store/products/productsSlice';

import { Empty } from '@/components/Empty';
import { FavoriteList } from '@/components/ProductsList';

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
