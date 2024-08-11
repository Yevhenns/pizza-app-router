'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import { ProductQuantity } from './ProductQuantity';
import {
  addToFavoriteAction,
  removeFromFavoriteAction,
} from '@/redux/products/productsSlice';
import { useAppDispatch } from '@/redux/hooks';
import { toast } from 'react-toastify';
import { ProductFooter } from './ProductFooter';
import { ProductDescription } from './ProductDescription';
import { ProductOptionsList } from './ProductOptionsList';
import css from './ProductListItem.module.scss';

interface ProductListItemProps {
  item: Product;
  addToCart: AddToCart;
  setFavoriteProducts: (_id: string) => boolean;
  favoriteProducts: Product[];
  options?: Option[];
}

export function ProductListItem({
  item,
  addToCart,
  setFavoriteProducts,
  favoriteProducts,
  options = [],
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
    category,
    vegan,
  } = item;

  const [totalPrice, setTotalPrice] = useState(price);
  const [totalPromPrice, setTotalPromPrice] = useState(promPrice);
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(setFavoriteProducts(_id));
  const [optionsShown, setOptionsShown] = useState(false);
  const [optionsArray, setOptionsArray] = useState<Option[]>([]);
  const [optionsSum, setOptionsSum] = useState(0);

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

  const handleShowOptions = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setOptionsShown(isChecked);
  };

  const handleChooseOptions = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    const optionData = options.find(item => item.title === e.target.value);

    if (optionData !== undefined) {
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
        _id={_id}
        photo={photo}
        title={title}
        description={description}
        dimension={dimension}
        promotion={promotion}
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
        _id={_id}
        totalQuantity={totalQuantity}
        promotion={promotion}
        totalPrice={totalPrice}
        totalPromPrice={totalPromPrice}
        addToCart={addToCart}
        optionsArray={optionsArray}
      />
    </article>
  );
}
