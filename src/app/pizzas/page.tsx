'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Heading } from '@/UI/basic/Heading';
import { LoaderModal } from '@/UI/common/LoaderModal';
import { filterByCategory } from '@/helpers/filterByCategory';
import { useAppSelector } from '@/redux/hooks';
import { getIsLoading, getProductsAll } from '@/redux/products/productsSlice';

import { PagesWrapper } from '@/components/PagesWrapper';
import { ProductsList } from '@/components/ProductsList';

import { options } from '../../options';

export default function Pizzas() {
  const products = useAppSelector(getProductsAll);
  const isLoading = useAppSelector(getIsLoading);
  const pizzas = filterByCategory(products, 'pizzas');

  return (
    <PagesWrapper>
      <Heading>Піца</Heading>
      {isLoading && <LoaderModal />}
      <ProductsList data={pizzas} options={options} />
      <ToastContainer />
    </PagesWrapper>
  );
}
