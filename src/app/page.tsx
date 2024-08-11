'use client';
import { Heading } from '@/UI/basic/Heading';
import { Weather } from '@/components/Weather';
import { ProductsList } from '@/modules/Products';
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from '@/redux/hooks';
import { getIsLoading, getPromotions } from '@/redux/products/productsSlice';
import { LoaderModal } from '@/UI/common/LoaderModal';
import { PagesWrapper } from '@/components/PagesWrapper';
import { QRCode } from '@/components/QRCode';
import { CarouselComponent } from '@/components/CarouselComponent';
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
