import { Metadata } from 'next';

import { fetchProductsByPromotion } from '@/store/products/productsOperations';

import { Addresses } from '@/components/Addresses/Addresses';
import { CarouselComponent } from '@/components/CarouselComponent/CarouselComponent';
import { ProductsList } from '@/components/ProductsList/ProductsList';
import { QRCode } from '@/components/QRCode/QRCode';
import { Weather } from '@/components/Weather/Weather';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

import css from './page.module.scss';

const title = 'Головна';

export const metadata: Metadata = {
  title: `Nostra Pizza | ${title}`,
};

export default async function Home() {
  const products = await fetchProductsByPromotion();

  return (
    <>
      <SectionContainer>
        <CarouselComponent />
      </SectionContainer>

      <SectionContainer>
        <h1>{title}</h1>
        <h2 className={css.heading}>Акційні пропозиції</h2>
        <ProductsList products={products} />
      </SectionContainer>

      <SectionContainer>
        <Weather />
      </SectionContainer>

      <SectionContainer>
        <QRCode />
      </SectionContainer>

      <SectionContainer>
        <Addresses />
      </SectionContainer>
    </>
  );
}
