'use client';

import { ToastContainer } from 'react-toastify';

import { Heading } from '@/UI/basic/Heading';
import { LoaderModal } from '@/UI/common/LoaderModal';
import { useAppSelector } from '@/redux/hooks';
import { getIsLoading, getPromotions } from '@/redux/products/productsSlice';

import { CarouselComponent } from '@/components/CarouselComponent';
import { PagesWrapper } from '@/components/PagesWrapper';
import { ProductsList } from '@/components/ProductsList';
import { QRCode } from '@/components/QRCode';
import { Weather } from '@/components/Weather';

import { options } from '../options';
import css from './page.module.scss';

export default function Home() {
  const promotionProducts = useAppSelector(getPromotions);
  const isLoading = useAppSelector(getIsLoading);

  return (
    <PagesWrapper>
      <Heading>Новинки</Heading>
      {isLoading && <LoaderModal />}
      <QRCode />
      <CarouselComponent />
      <h2 className={css.heading}>Акційні пропозиції</h2>
      <ProductsList data={promotionProducts} options={options} />
      <Weather />
      <ToastContainer />
    </PagesWrapper>
  );
}
