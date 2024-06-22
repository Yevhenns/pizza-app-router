import { Heading } from '@/UI/basic/Heading';
import { ProductsList } from '@/modules/Products';
import { useAppSelector } from '@/redux/hooks';
import { getProductsAll, getIsLoading } from '@/redux/products/productsSlice';
import { filterByCategory } from '@/helpers/filterByCategory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAll } from '@/requests/api/products';
import { PagesWrapper } from '@/components/PagesWrapper';
import { LoaderModal } from '@/UI/common/LoaderModal';

const Drinks = () => {
  const products = useAppSelector(getProductsAll);
  const isLoading = useAppSelector(getIsLoading);
  const drinks = filterByCategory(products, 'drinks');
  console.log(console.log(getAll()));

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
