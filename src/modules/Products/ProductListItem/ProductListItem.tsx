'use client';
import { ChangeEvent, useState } from 'react';
import { ProductQuantity } from './ProductQuantity';
import {
  addToFavoriteAction,
  removeFromFavoriteAction,
} from '@/redux/products/productsSlice';
import { useAppDispatch } from '@/redux/hooks';
import { toast } from 'react-toastify';
import { ProductFooter } from './ProductFooter';
import { ProductDescription } from './ProductDescription';
import { Icon } from '@/UI/basic/Icon';
import { RoundButton } from '@/UI/basic/RoundButton';
import { ProductOptionsList } from './ProductOptionsList';
import css from './ProductListItem.module.scss';

interface ProductListItemProps {
  item: TProduct;
  addToCart: TAddToCart;
  setFavoriteProducts: (_id: string) => boolean;
  favoriteProducts: TProductsArr;
  isInCart: (_id: string) => boolean;
  options?: PizzaOptions;
}

export function ProductListItem({
  item,
  addToCart,
  setFavoriteProducts,
  favoriteProducts,
  isInCart,
  options,
}: ProductListItemProps) {
  const {
    _id,
    title,
    description,
    dimension,
    price,
    photo,
    promotion,
    promPrice,
  } = item;

  const [totalPrice, setTotalPrice] = useState(price);
  const [totalPromPrice, setTotalPromPrice] = useState(promPrice);
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(setFavoriteProducts(_id));
  const [optionsShown, setOptionsShown] = useState(false);

  const dispatch = useAppDispatch();

  const getTotalQuantity = (quantity: number) => {
    setTotalQuantity(quantity);
    setTotalPrice(price * quantity);
    setTotalPromPrice(promPrice * quantity);
  };

  const addToFavorite = () => {
    if (favoriteProducts.some(item => item._id === _id)) {
      setIsFavorite(false);
      dispatch(removeFromFavoriteAction(_id));
      toast.warn('Видалено з улюблених', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
      });
    } else {
      setIsFavorite(true);
      dispatch(addToFavoriteAction(item));
      toast.success('Додано в улюблені', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setOptionsShown(isChecked);
  };

  return (
    <article className={css.listItem}>
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
      <ProductDescription
        photo={photo}
        title={title}
        description={description}
        dimension={dimension}
      />
      <ProductQuantity
        getTotalQuantity={getTotalQuantity}
        handleChange={handleChange}
        options={options}
      />
      {optionsShown && <ProductOptionsList options={options} />}
      <ProductFooter
        _id={_id}
        totalQuantity={totalQuantity}
        promotion={promotion}
        totalPrice={totalPrice}
        totalPromPrice={totalPromPrice}
        addToCart={addToCart}
        isInCart={isInCart}
      />
    </article>
  );
}
