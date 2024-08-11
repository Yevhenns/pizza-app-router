'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Heading } from '@/UI/basic/Heading';
import { LoaderModal } from '@/UI/common/LoaderModal';
import { useAppSelector } from '@/redux/hooks';
import { getFavorites, getIsLoading } from '@/redux/products/productsSlice';

import { Empty } from '@/components/Empty';
import { PagesWrapper } from '@/components/PagesWrapper';
import { ProductsList } from '@/components/ProductsList';

import { options } from '../../options';

export default function Favorite() {
  const isLoading = useAppSelector(getIsLoading);
  const favoriteProducts = useAppSelector(getFavorites);

  return (
    <PagesWrapper>
      <Heading>Улюблене</Heading>
      {isLoading && <LoaderModal />}
      {favoriteProducts.length > 0 ? (
        <ProductsList data={favoriteProducts} options={options} />
      ) : (
        <Empty text={'В улюбленому нічого немає!'} />
      )}
      <ToastContainer />
    </PagesWrapper>
  );
}
