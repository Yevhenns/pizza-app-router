'use client';

import { useAppSelector } from '@/redux/hooks';
import { getPromotions } from '@/redux/products/productsSlice';

import { CarouselComponent } from '@/components/CarouselComponent';
import { ProductsList } from '@/components/ProductsList';
import { QRCode } from '@/components/QRCode';
import { Weather } from '@/components/Weather';

import css from './page.module.scss';

export default function Home() {
  const promotionProducts = useAppSelector(getPromotions);

  return (
    <>
      <QRCode />
      <CarouselComponent />
      <h2 className={css.heading}>Акційні пропозиції</h2>
      <ProductsList data={promotionProducts} />
      <Weather />
    </>
  );
}
