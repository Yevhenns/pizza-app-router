'use client';

import { useLayoutEffect } from 'react';

import { redirect } from 'next/navigation';

import { useWindowWidth } from '@/hooks/useWindowWidth';
import { getUserInfo } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';

import { ProductsTable } from './ProductsTable/ProductsTable';

type AdminProps = {
  products: Product[];
};

export default function Admin({ products }: AdminProps) {
  const ADMIN_ID = process.env.ADMIN_ID;

  const userInfo = useAppSelector(getUserInfo);

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
