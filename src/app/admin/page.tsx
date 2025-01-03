'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

import Image from 'next/image';
import { redirect } from 'next/navigation';

import { useWindowWidth } from '@/hooks/useWindowWidth';
import { getUserInfo } from '@/redux/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { getProductsAll } from '@/utils/getProductsAllNest';

import { ProductsTable } from '@/components/Admin/ProductsTable';

import css from './page.module.scss';

export default function Admin() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  const ADMIN_ID = process.env.ADMIN_ID;

  const userInfo = useAppSelector(getUserInfo);

  const width = useWindowWidth();

  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsAll();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useLayoutEffect(() => {
    if (userInfo?.sub !== ADMIN_ID || width <= 768) {
      redirect('/');
    }
  }, [ADMIN_ID, userInfo?.sub, width]);

  return (
    <div>
      <ProductsTable products={products} />
    </div>
  );
}
