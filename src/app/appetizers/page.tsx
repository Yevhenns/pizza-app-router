'use client';

import { filterByCategory } from '@/helpers/filterByCategory';
import { useAppSelector } from '@/redux/hooks';
import { getProductsAll } from '@/redux/products/productsSlice';

import { ProductsList } from '@/components/ProductsList';

export default function Appetizers() {
  const products = useAppSelector(getProductsAll);
  const appetizers = filterByCategory(products, 'appetizers');

  return <ProductsList data={appetizers} />;
}
