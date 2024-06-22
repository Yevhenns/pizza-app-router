import { Heading } from '@/UI/basic/Heading';
import { ProductsList } from '@/modules/Products';
import { PagesWrapper } from '@/components/PagesWrapper';
import { LoaderModal } from '@/UI/common/LoaderModal';
import { useAppSelector } from '@/redux/hooks';
import { getIsLoading, getProductsAll } from '@/redux/products/productsSlice';
import { filterByCategory } from '@/helpers/filterByCategory';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Pizzas = () => {
  const products = useAppSelector(getProductsAll);
  const isLoading = useAppSelector(getIsLoading);
  const pizzas = filterByCategory(products, 'pizzas');

  return (
    <PagesWrapper title="Nostra pizza - Піца">
      <Heading>Піца</Heading>
      {isLoading && <LoaderModal />}
      <ProductsList data={pizzas} />
      <ToastContainer />
    </PagesWrapper>
  );
};
export default Pizzas;
