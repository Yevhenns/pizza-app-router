import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addToFavoriteAction,
  getFavorites,
  removeFromFavoriteAction,
} from '@/store/products/productsSlice';

import { Icon } from '@/components/basic/Icon';
import { RoundButton } from '@/components/basic/RoundButton';

import css from './ProductDescription.module.scss';

type ProductDescriptionProps = {
  item: Product;
};

export function ProductDescription({ item }: ProductDescriptionProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { _id, photo, title, description, dimension, promotion } = item;

  const favoriteProducts = useAppSelector(getFavorites);

  const dispatch = useAppDispatch();

  const addToFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavoriteAction(_id));
      toast.warn('Видалено з улюблених', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
      });
    } else {
      dispatch(addToFavoriteAction(item));
      toast.success('Додано в улюблені', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };

  useEffect(() => {
    const checkIsFavoriteProducts = () => {
      return favoriteProducts.some(
        favoriteProduct => favoriteProduct._id === _id
      );
    };
    setIsFavorite(checkIsFavoriteProducts);
  }, [_id, favoriteProducts]);

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
