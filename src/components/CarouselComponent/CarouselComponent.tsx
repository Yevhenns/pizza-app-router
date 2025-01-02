'use client';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Image from 'next/image';

import css from './CarouselComponent.module.scss';

type CarouselImageProps = {
  src: string;
  alt: string;
  isVisible: boolean;
};

function CarouselImage({ src, alt, isVisible }: CarouselImageProps) {
  return (
    <div className={css.item}>
      <Image
        src={src}
        alt={alt}
        width={1062}
        height={401}
        priority={isVisible}
        loading={isVisible ? 'eager' : 'lazy'}
      />
    </div>
  );
}

export function CarouselComponent() {
  return (
    <div className={css.layout}>
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={true}
        showThumbs={false}
        showStatus={false}
      >
        <CarouselImage
          src="https://res.cloudinary.com/dyka4vajb/image/upload/f_auto,q_auto/v1/hatamagnata/carousel/atmd10kbcsoh83pcrv0u"
          alt="Action 1"
          isVisible
        />
        <CarouselImage
          src="https://res.cloudinary.com/dyka4vajb/image/upload/f_auto,q_auto/v1/hatamagnata/carousel/ac59dux1vcxarfgdattf"
          alt="Action 2"
          isVisible={false}
        />
      </Carousel>
    </div>
  );
}
