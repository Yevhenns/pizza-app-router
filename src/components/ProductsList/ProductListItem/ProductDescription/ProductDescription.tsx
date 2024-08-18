import Image from 'next/image';

import { Icon } from '@/components/basic/Icon';
import { RoundButton } from '@/components/basic/RoundButton';

import css from './ProductDescription.module.scss';

type ProductDescriptionProps = {
  _id: string;
  photo: string;
  title: string;
  description: string;
  dimension: string;
  promotion: boolean;
  isFavorite: boolean;
  addToFavorite: () => void;
};

export function ProductDescription({
  photo,
  title,
  description,
  dimension,
  promotion,
  isFavorite,
  addToFavorite,
}: ProductDescriptionProps) {
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
