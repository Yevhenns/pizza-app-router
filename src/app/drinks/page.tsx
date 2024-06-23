'use client';
import { Heading } from '@/UI/basic/Heading';
import { ProductsList } from '@/modules/Products';
import { useAppSelector } from '@/redux/hooks';
import { getProductsAll, getIsLoading } from '@/redux/products/productsSlice';
import { filterByCategory } from '@/helpers/filterByCategory';
import { ToastContainer } from 'react-toastify';
// import { getAll } from '@/app/api/products';
import { PagesWrapper } from '@/components/PagesWrapper';
import { LoaderModal } from '@/UI/common/LoaderModal';
import 'react-toastify/dist/ReactToastify.css';
// import connectDB from '@/requests/lib/connectDB';

const Drinks = () => {
  const products = useAppSelector(getProductsAll);
  const isLoading = useAppSelector(getIsLoading);
  const drinks = filterByCategory(products, 'drinks');
  // getAll();

  // connectDB().then(data => {
  //   console.log(data);
  // });

  return (
    <PagesWrapper title="Nostra pizza - Напої">
      <Heading>Напої</Heading>
      {isLoading && <LoaderModal />}
      <ProductsList data={drinks} />
      <ToastContainer />
    </PagesWrapper>
  );
};

export default Drinks;
