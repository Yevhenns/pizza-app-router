'use client';

import { useEffect } from 'react';

import { useLogOutAfterTokenExpires } from '@/hooks/useLogOutAfterTokenExpires';
import { checkCart } from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import { checkFavorites } from '@/store/products/productsSlice';

export default function SavedProductsProvider({
  allproductsId,
  children,
}: Readonly<{
  allproductsId: { _id: string }[];
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();

  useLogOutAfterTokenExpires();

  useEffect(() => {
    if (allproductsId.length > 0) {
      dispatch(checkFavorites(allproductsId));
      dispatch(checkCart(allproductsId));
    }
  }, [dispatch, allproductsId]);

  return <>{children}</>;
}
