'use client';

import { ToastContainer } from 'react-toastify';

import { useAppSelector } from '@/redux/hooks';
import { getIsLoading, getPromotions } from '@/redux/products/productsSlice';

import { CarouselComponent } from '@/components/CarouselComponent';
import { ProductsList } from '@/components/ProductsList';
import { QRCode } from '@/components/QRCode';
import { Weather } from '@/components/Weather';
import { Heading } from '@/components/basic/Heading';
import { LoaderModal } from '@/components/common/LoaderModal';

import { options } from '../options';
import css from './page.module.scss';

export default function Home() {
  const promotionProducts = useAppSelector(getPromotions);
  const isLoading = useAppSelector(getIsLoading);

  return (
    <>
      <Heading>Новинки</Heading>
      {isLoading && <LoaderModal />}
      <QRCode />
      <CarouselComponent />
      <h2 className={css.heading}>Акційні пропозиції</h2>
      <ProductsList data={promotionProducts} options={options} />
      <Weather />
      <ToastContainer />
    </>
  );
}
