import { CarouselComponent } from '@/components/CarouselComponent';
import { ProductsList } from '@/components/ProductsList';
import { QRCode } from '@/components/QRCode';
import { Weather } from '@/components/Weather';

import css from './page.module.scss';

export default async function Home() {
  return (
    <>
      <QRCode />
      <CarouselComponent />
      <h2 className={css.heading}>Акційні пропозиції</h2>
      <ProductsList category="promotions" />
      <Weather />
    </>
  );
}
