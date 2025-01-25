'use client';

import { useEffect } from 'react';

import { checkCart } from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import { checkFavorites } from '@/store/products/productsSlice';
import { APIProvider } from '@vis.gl/react-google-maps';

export function GoogleProvider({
  products,
  children,
}: Readonly<{
  products: Product[];
  children: React.ReactNode;
}>) {
  const API_KEY = process.env.GOOGLE_MAPS_API_KEY as string;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products.length > 0) {
      dispatch(checkFavorites(products));
      dispatch(checkCart(products));
    }
  }, [dispatch, products]);

  return <APIProvider apiKey={API_KEY}>{children}</APIProvider>;
}
