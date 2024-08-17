'use client';

import { filterByCategory } from '@/helpers/filterByCategory';
import { useAppSelector } from '@/redux/hooks';
import { getIsLoading, getProductsAll } from '@/redux/products/productsSlice';

import { ProductsList } from '@/components/ProductsList';
import { LoaderModal } from '@/components/common/LoaderModal';

export default function Pizzas() {
  const products = useAppSelector(getProductsAll);
  const isLoading = useAppSelector(getIsLoading);
  const pizzas = filterByCategory(products, 'pizzas');

  return (
    <>
      {isLoading && <LoaderModal />}
      <ProductsList data={pizzas} />
    </>
  );
}
