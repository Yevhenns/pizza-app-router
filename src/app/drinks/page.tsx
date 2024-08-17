'use client';

import { filterByCategory } from '@/helpers/filterByCategory';
import { useAppSelector } from '@/redux/hooks';
import { getProductsAll } from '@/redux/products/productsSlice';

import { ProductsList } from '@/components/ProductsList';

export default function Drinks() {
  const products = useAppSelector(getProductsAll);
  const drinks = filterByCategory(products, 'drinks');

  return <ProductsList data={drinks} />;
}
