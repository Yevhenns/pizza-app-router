import { Metadata } from 'next';

import { Addresses } from '@/components/Addresses';
import { CarouselComponent } from '@/components/CarouselComponent';
import { ProductsList } from '@/components/ProductsList';
import { QRCode } from '@/components/QRCode';
import { Weather } from '@/components/Weather';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

import css from './page.module.scss';

const title = 'Новинки';

export const metadata: Metadata = {
  title: `Nostra Pizza | ${title}`,
};

export default async function Home() {
  return (
    <>
      <SectionContainer>
        <CarouselComponent />
      </SectionContainer>

      <SectionContainer>
        <h1>{title}</h1>
        <h2 className={css.heading}>Акційні пропозиції</h2>
        <ProductsList category="promotions" />
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
