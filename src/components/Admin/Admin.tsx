'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

import { redirect } from 'next/navigation';

import { useWindowWidth } from '@/hooks/useWindowWidth';
import { getUserInfo } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';
import { getProducts } from '@/store/products/productsOperations';

import { ProductsTable } from './ProductsTable/ProductsTable';

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
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error('Помилка:', error);
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
