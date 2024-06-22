'use client';

import Heading from '@/UI/basic/Heading/Heading';
import { Weather } from '@/components/Weather';
import ProductsList from '@/modules/Products/ProductsList';
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from '@/redux/hooks';
import { getIsLoading, getPromotions } from '@/redux/products/productsSlice';
import css from '../styles/pages/Index.module.scss';
import { LoaderModal } from '@/UI/common/LoaderModal';
import { PagesWrapper } from '@/components/PagesWrapper';
import { CarouselComponent } from '@/components/CarouselComponent';

export default function Home() {
  const promotionProducts = useAppSelector(getPromotions);
  const isLoading = useAppSelector(getIsLoading);

  return (
    <PagesWrapper title="Nostra pizza - Новинки">
      <Heading>Новинки</Heading>
      {isLoading && <LoaderModal />}
      <Weather />
      <CarouselComponent />
      <h2 className={css.heading}>Найпопулярніші позиції</h2>
      <ProductsList data={promotionProducts} />
      <ToastContainer />
    </PagesWrapper>
  );
}
