'use client';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppSelector } from '@/redux/hooks';
import { getFavorites, getIsLoading } from '@/redux/products/productsSlice';

import { Empty } from '@/components/Empty';
import { ProductsList } from '@/components/ProductsList';
import { LoaderModal } from '@/components/common/LoaderModal';

import { options } from '../../options';

export default function Favorite() {
  const isLoading = useAppSelector(getIsLoading);
  const favoriteProducts = useAppSelector(getFavorites);

  return (
    <>
      {isLoading && <LoaderModal />}
      {favoriteProducts.length > 0 ? (
        <ProductsList data={favoriteProducts} options={options} />
      ) : (
        <Empty text={'В улюбленому нічого немає!'} />
      )}
      <ToastContainer />
    </>
  );
}
