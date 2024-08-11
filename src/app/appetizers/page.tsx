'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { filterByCategory } from '@/helpers/filterByCategory';
import { useAppSelector } from '@/redux/hooks';
import { getIsLoading, getProductsAll } from '@/redux/products/productsSlice';

import { ProductsList } from '@/components/ProductsList';
import { Heading } from '@/components/basic/Heading';
import { LoaderModal } from '@/components/common/LoaderModal';

export default function Appetizers() {
  const products = useAppSelector(getProductsAll);
  const isLoading = useAppSelector(getIsLoading);
  const appetizers = filterByCategory(products, 'appetizers');

  return (
    <>
      <Heading>Закуски</Heading>
      {isLoading && <LoaderModal />}
      <ProductsList data={appetizers} />
      <ToastContainer />
    </>
  );
}
