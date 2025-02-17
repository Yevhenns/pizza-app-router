'use client';

import { useEffect } from 'react';

import { useLogOutAfterTokenExpires } from '@/hooks/useLogOutAfterTokenExpires';
import { checkCart } from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import { checkFavorites } from '@/store/products/productsSlice';

export default function SavedProductsProvider({
  allproductsIdList,
  children,
}: Readonly<{
  allproductsIdList: string[];
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();

  useLogOutAfterTokenExpires();

  useEffect(() => {
    if (allproductsIdList.length > 0) {
      dispatch(checkFavorites(allproductsIdList));
      dispatch(checkCart(allproductsIdList));
    }
  }, [dispatch, allproductsIdList]);

  return <>{children}</>;
}
