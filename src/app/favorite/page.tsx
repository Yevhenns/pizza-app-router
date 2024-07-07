'use client';
import { Heading } from '@/UI/basic/Heading';
import { Empty } from '@/components/Empty';
import { getFavorites, getIsLoading } from '@/redux/products/productsSlice';
import { useAppSelector } from '@/redux/hooks';
import { ProductsList } from '@/modules/Products';
import { LoaderModal } from '@/UI/common/LoaderModal';
import { PagesWrapper } from '@/components/PagesWrapper';
import { ToastContainer } from 'react-toastify';
import { options } from '../../options';
import 'react-toastify/dist/ReactToastify.css';

export default function Favorite() {
  const isLoading = useAppSelector(getIsLoading);
  const favoriteProducts = useAppSelector(getFavorites);

  return (
    <PagesWrapper>
      <Heading visible>Улюблене</Heading>
      {isLoading && <LoaderModal />}
      {favoriteProducts.length > 0 ? (
        <ProductsList data={favoriteProducts} options={options} />
      ) : (
        <Empty text={'Тут нічого немає!'} />
      )}
      <ToastContainer />
    </PagesWrapper>
  );
}
