import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  addToFavoriteAction,
  getFavorites,
  removeFromFavoriteAction,
} from '@/store/products/productsSlice';

import { Icon } from '@/components/shared/Icon/Icon';
import { RoundButton } from '@/components/shared/RoundButton/RoundButton';

import css from './ProductDescription.module.scss';

type ProductDescriptionProps = {
  item: Product;
  preview: boolean;
};

export function ProductDescription({
  item,
  preview = false,
}: ProductDescriptionProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { _id, photo, title, description, dimension, promotion, vegan, spicy } =
    item;

  const favoriteProductsId = useAppSelector(getFavorites);

  const dispatch = useAppDispatch();

  const addToFavorite = () => {
    if (preview) return;
    if (isFavorite) {
      dispatch(removeFromFavoriteAction(_id));
      toast.warn('Видалено з улюблених', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeButton: false,
      });
    } else {
      dispatch(addToFavoriteAction(_id));
      toast.success('Додано в улюблені', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeButton: false,
      });
    }
  };

  useEffect(() => {
    const checkIsFavoriteProducts = () => {
      return favoriteProductsId.some(
        favoriteProductId => favoriteProductId === _id
      );
    };
    setIsFavorite(checkIsFavoriteProducts);
  }, [_id, favoriteProductsId]);

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
        {vegan && (
          <Image
            className={css.vegan}
            src={'/leave.png'}
            alt="vegan photo"
            width={40}
            height={40}
            priority={true}
          />
        )}
        {spicy && (
          <Image
            className={css.spicy}
            src={'/spicy.png'}
            alt="vegan photo"
            width={40}
            height={40}
            priority={true}
          />
        )}
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
