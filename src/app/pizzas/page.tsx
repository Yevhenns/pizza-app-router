'use client';

import { filterByCategory } from '@/helpers/filterByCategory';
import { useAppSelector } from '@/redux/hooks';
import { getProductsAll } from '@/redux/products/productsSlice';

import { ProductsList } from '@/components/ProductsList';

export default function Pizzas() {
  const products = useAppSelector(getProductsAll);
  const pizzas = filterByCategory(products, 'pizzas');

  return <ProductsList data={pizzas} />;
}
