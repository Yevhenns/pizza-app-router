'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { filterByCategory } from '@/helpers/filterByCategory';
import { useAppSelector } from '@/redux/hooks';
import { getIsLoading, getProductsAll } from '@/redux/products/productsSlice';

import { ProductsList } from '@/components/ProductsList';
import { LoaderModal } from '@/components/common/LoaderModal';

import { options } from '../../options';

export default function Pizzas() {
  const products = useAppSelector(getProductsAll);
  const isLoading = useAppSelector(getIsLoading);
  const pizzas = filterByCategory(products, 'pizzas');

  return (
    <>
      {isLoading && <LoaderModal />}
      <ProductsList data={pizzas} options={options} />
      <ToastContainer />
    </>
  );
}
