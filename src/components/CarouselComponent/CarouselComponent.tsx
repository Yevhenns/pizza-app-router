import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import css from './CarouselComponent.module.scss';

interface CarouselImageProps {
  src: string;
  alt: string;
}

export function CarouselImage({ src, alt }: CarouselImageProps) {
  return (
    <div className={css.item}>
      <Image src={src} alt={alt} width={1062} height={401} priority={true} />
    </div>
  );
}

export function CarouselComponent() {
  return (
    <Carousel
      autoPlay
      infiniteLoop
      showArrows={true}
      showThumbs={false}
      showStatus={false}
    >
      <CarouselImage
        src="https://res.cloudinary.com/dyka4vajb/image/upload/f_auto,q_auto/v1/hatamagnata/carousel/g6kopv5fswwrxi0vys6a"
        alt="Action 1"
      />
      <CarouselImage
        src="https://res.cloudinary.com/dyka4vajb/image/upload/f_auto,q_auto/v1/hatamagnata/carousel/swejyzvcyuwcpeqip4sy"
        alt="Action 2"
      />
      <CarouselImage
        src="https://res.cloudinary.com/dyka4vajb/image/upload/f_auto,q_auto/v1/hatamagnata/carousel/ti0wittkvf5su8nhfbdy"
        alt="Action 3"
      />
    </Carousel>
  );
}
