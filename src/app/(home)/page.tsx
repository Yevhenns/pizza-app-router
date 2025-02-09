import { Metadata } from 'next';

import { Addresses } from '@/components/Addresses';
import { CarouselComponent } from '@/components/CarouselComponent';
import { ProductsList } from '@/components/ProductsList';
import { QRCode } from '@/components/QRCode';
import { Weather } from '@/components/Weather';

import css from './page.module.scss';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Новинки',
};

export default async function Home() {
  return (
    <>
      <CarouselComponent />
      <h1>Головна</h1>
      <h2 className={css.heading}>Акційні пропозиції</h2>
      <ProductsList category="promotions" />
      <Weather />
      <Addresses />
      <QRCode />
    </>
  );
}
