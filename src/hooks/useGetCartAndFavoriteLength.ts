import { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/hooks';
import { getFilteredCart } from '@/redux/cart/cartSlice';
import { getFavorites } from '@/redux/products/productsSlice';

export const useGetCartAndFavoriteLength = () => {
  const [cartLength, setCartLength] = useState<null | number>(null);
  const [favoriteLength, setFavoriteLength] = useState<null | number>(null);

  const cart = useAppSelector(getFilteredCart).length;
  const favorite = useAppSelector(getFavorites).length;

  useEffect(() => {
    setCartLength(cart);
  }, [cart]);

  useEffect(() => {
    setFavoriteLength(favorite);
  }, [favorite]);

  return { cartLength, favoriteLength };
};
