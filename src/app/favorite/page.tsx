'use client';

import { useAppSelector } from '@/redux/hooks';
import { getFavorites } from '@/redux/products/productsSlice';

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
