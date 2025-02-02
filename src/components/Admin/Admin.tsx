'use client';

import { useLayoutEffect } from 'react';

import { redirect } from 'next/navigation';

import { useWindowWidth } from '@/hooks/useWindowWidth';
import { getUserInfo } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';

import { ProductsTable } from './ProductsTable/ProductsTable';
import { SupplementsTable } from './SupplementsTable';

type AdminProps = {
  products: Product[];
  supplements: Supplement[];
};

export default function Admin({ products, supplements }: AdminProps) {
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
    <>
      <div>{products.length > 0 && <ProductsTable products={products} />}</div>
      <div>
        {products.length > 0 && <SupplementsTable supplements={supplements} />}
      </div>
    </>
  );
}
