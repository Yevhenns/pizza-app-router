import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { addItem } from '@/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addToFavoriteAction,
  getFavorites,
  removeFromFavoriteAction,
} from '@/redux/products/productsSlice';

import { options } from '../../../assets/options';
import { ProductDescription } from './ProductDescription';
import { ProductFooter } from './ProductFooter';
import css from './ProductListItem.module.scss';
import { ProductOptionsList } from './ProductOptionsList';
import { ProductQuantity } from './ProductQuantity';

type ProductListItemProps = {
  item: Product;
  checkIsFavoriteProducts: (_id: string) => boolean;
};

export function ProductListItem({
  item,
  checkIsFavoriteProducts,
}: ProductListItemProps) {
  const { _id, price, promotion, promPrice, category, vegan } = item;

  const [totalPrice, setTotalPrice] = useState(price);
  const [totalPromPrice, setTotalPromPrice] = useState(promPrice);
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(checkIsFavoriteProducts(_id));
  const [optionsShown, setOptionsShown] = useState(false);
  const [optionsArray, setOptionsArray] = useState<Option[]>([]);
  const [optionsSum, setOptionsSum] = useState(0);

  const favoriteProducts = useAppSelector(getFavorites);

  const dispatch = useAppDispatch();

  const getTotalQuantity = (quantity: number) => {
    setTotalQuantity(quantity);
    setTotalPrice((price + optionsSum) * quantity);
    setTotalPromPrice((promPrice + optionsSum) * quantity);
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

  const optionsTitles = optionsArray.map(item => item.title);

  const addToCart = () => {
    const { photo, title, _id } = item;
    const cartItem = {
      _id: _id,
      photo: photo,
      title: title,
      quantity: totalQuantity,
      optionsTitles: optionsTitles,
      totalPrice: promotion ? totalPromPrice : totalPrice,
    };
    dispatch(addItem(cartItem));
    toast.success('Додано до кошика', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
    });
  };

  const handleShowOptions = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setOptionsShown(isChecked);
  };

  const handleChooseOptions = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    const optionData = options.find(item => item.title === e.target.value);

    if (optionData) {
      if (checked && !optionsArray.includes(optionData)) {
        setOptionsArray([...optionsArray, optionData]);
        setOptionsSum(optionsSum + optionData.price);
      }
      if (!checked && optionsArray.includes(optionData)) {
        const filteredArray = optionsArray.filter(item => item !== optionData);
        setOptionsArray(filteredArray);
        setOptionsSum(optionsSum - optionData.price);
      }
    }
  };

  useEffect(() => {
    !optionsShown && setOptionsArray([]), setOptionsSum(0);
  }, [optionsShown]);

  return (
    <article className={css.listItem}>
      <ProductDescription
        item={item}
        isFavorite={isFavorite}
        addToFavorite={addToFavorite}
      />
      <ProductQuantity
        getTotalQuantity={getTotalQuantity}
        handleChange={handleShowOptions}
        options={options}
        category={category}
        _id={_id}
      />
      {optionsShown && (
        <ProductOptionsList
          options={options}
          handleChange={handleChooseOptions}
          vegan={vegan}
        />
      )}
      <ProductFooter
        promotion={promotion}
        totalPrice={totalPrice}
        totalPromPrice={totalPromPrice}
        addToCart={addToCart}
      />
    </article>
  );
}
