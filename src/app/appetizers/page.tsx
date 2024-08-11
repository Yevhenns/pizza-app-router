'use client';
import { Heading } from '@/UI/basic/Heading';
import { ProductsList } from '@/components/ProductsList';
import { useAppSelector } from '@/redux/hooks';
import { getIsLoading, getProductsAll } from '@/redux/products/productsSlice';
import { filterByCategory } from '@/helpers/filterByCategory';
import { ToastContainer } from 'react-toastify';
import { PagesWrapper } from '@/components/PagesWrapper';
import { LoaderModal } from '@/UI/common/LoaderModal';
import 'react-toastify/dist/ReactToastify.css';

export default function Appetizers() {
  const products = useAppSelector(getProductsAll);
  const isLoading = useAppSelector(getIsLoading);
  const appetizers = filterByCategory(products, 'appetizers');

  return (
    <PagesWrapper>
      <Heading>Закуски</Heading>
      {isLoading && <LoaderModal />}
      <ProductsList data={appetizers} />
      <ToastContainer />
    </PagesWrapper>
  );
}
