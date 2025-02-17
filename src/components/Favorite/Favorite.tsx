'use client';

import { useAppSelector } from '@/store/hooks';
import { getFavorites } from '@/store/products/productsSlice';

import { FavoriteList } from '../ProductsList/FavoriteList';
import { Empty } from '../shared/Empty/Empty';

type FavoriteProps = {
  products: Product[];
  supplements: Supplement[];
};

export default function Favorite({ products, supplements }: FavoriteProps) {
  const favoriteProductsId = useAppSelector(getFavorites);
  const favoriteProducts = products.filter(product =>
    favoriteProductsId.includes(product._id)
  );

  return (
    <>
      {favoriteProducts.length > 0 ? (
        <FavoriteList
          favoriteProducts={favoriteProducts}
          supplements={supplements}
        />
      ) : (
        <Empty text={'В улюбленому нічого немає!'} />
      )}
    </>
  );
}
