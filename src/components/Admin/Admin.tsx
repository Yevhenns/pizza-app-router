'use client';

import { useLayoutEffect } from 'react';

import { redirect } from 'next/navigation';

import { useWindowWidth } from '@/hooks/useWindowWidth';
import { getUserInfo } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';
import { getProductsAll } from '@/store/products/productsSlice';

import { ProductsTable } from './ProductsTable/ProductsTable';

export default function Admin() {
  const ADMIN_ID = process.env.ADMIN_ID;

  const userInfo = useAppSelector(getUserInfo);
  const products = useAppSelector(getProductsAll);

  const width = useWindowWidth();

  const minimalScreenWidth = 768;

  useLayoutEffect(() => {
    if (userInfo?.sub !== ADMIN_ID || width <= minimalScreenWidth) {
      redirect('/');
    }
  }, [ADMIN_ID, userInfo?.sub, width]);

  return (
    <div>{products.length > 0 && <ProductsTable products={products} />}</div>
  );
}
