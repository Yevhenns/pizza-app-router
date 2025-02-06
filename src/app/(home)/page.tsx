import { Metadata } from 'next';

import { CarouselComponent } from '@/components/CarouselComponent';
import { ProductsList } from '@/components/ProductsList';
import { QRCode } from '@/components/QRCode';
import { Weather } from '@/components/Weather';

import { InstallPrompt } from '../InstallPrompt';
import { PushNotificationManager } from '../PushNotificationManager';
import css from './page.module.scss';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Новинки',
};

export default async function Home() {
  return (
    <>
      {/* <PushNotificationManager /> */}
      <InstallPrompt />
      <CarouselComponent />
      <h1>Новинки</h1>
      <h2 className={css.heading}>Акційні пропозиції</h2>
      <ProductsList category="promotions" />
      <Weather />
      {/* <QRCode /> */}
    </>
  );
}
