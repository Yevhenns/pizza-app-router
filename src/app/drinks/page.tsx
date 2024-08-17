'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { filterByCategory } from '@/helpers/filterByCategory';
import { useAppSelector } from '@/redux/hooks';
import { getIsLoading, getProductsAll } from '@/redux/products/productsSlice';

import { ProductsList } from '@/components/ProductsList';
import { LoaderModal } from '@/components/common/LoaderModal';

export default function Drinks() {
  const products = useAppSelector(getProductsAll);
  const isLoading = useAppSelector(getIsLoading);
  const drinks = filterByCategory(products, 'drinks');

  return (
    <>
      {isLoading && <LoaderModal />}
      <ProductsList data={drinks} />
      <ToastContainer />
    </>
  );
}
