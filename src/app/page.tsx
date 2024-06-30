'use client';
import { Heading } from '@/UI/basic/Heading';
import { Weather } from '@/components/Weather';
import { ProductsList } from '@/modules/Products';
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from '@/redux/hooks';
import { getIsLoading, getPromotions } from '@/redux/products/productsSlice';
import { LoaderModal } from '@/UI/common/LoaderModal';
import { PagesWrapper } from '@/components/PagesWrapper';
import { CarouselComponent } from '@/components/CarouselComponent';
import css from '../styles/pages/Index.module.scss';

export default function Home() {
  const promotionProducts = useAppSelector(getPromotions);
  const isLoading = useAppSelector(getIsLoading);

  return (
    <PagesWrapper>
      <Heading>Новинки</Heading>
      {isLoading && <LoaderModal />}
      <CarouselComponent />
      <h2 className={css.heading}>Акційні пропозиції</h2>
      <ProductsList data={promotionProducts} />
      <Weather />
      <ToastContainer />
    </PagesWrapper>
  );
}
