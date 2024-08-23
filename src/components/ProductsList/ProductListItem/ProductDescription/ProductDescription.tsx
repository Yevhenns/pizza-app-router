import Image from 'next/image';

import { Icon } from '@/components/basic/Icon';
import { RoundButton } from '@/components/basic/RoundButton';

import css from './ProductDescription.module.scss';

type ProductDescriptionProps = {
  item: Product;
  isFavorite: boolean;
  addToFavorite: () => void;
};

export function ProductDescription({
  item,
  isFavorite,
  addToFavorite,
}: ProductDescriptionProps) {
  const { photo, title, description, dimension, promotion } = item;
  return (
    <div className={css.descriprionWrapper}>
      <div className={css.imageWrapper}>
        <Image
          src={photo}
          alt="item photo"
          width={200}
          height={200}
          priority={true}
        />
        {promotion && <div className={css.promotion}>Акція</div>}
        <div className={css.favorite}>
          <RoundButton aria-label="add to favorite" onClick={addToFavorite}>
            {isFavorite ? (
              <Icon
                svg="heart-filled"
                iconWidth={34}
                iconHeight={34}
                color="accent"
              />
            ) : (
              <Icon svg="heart" iconWidth={34} iconHeight={34} />
            )}
          </RoundButton>
        </div>
      </div>
      <hgroup className={css.info}>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>{dimension}</p>
      </hgroup>
    </div>
  );
}
