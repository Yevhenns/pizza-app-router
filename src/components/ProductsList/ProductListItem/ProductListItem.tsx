'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useFilterSupplements } from '@/hooks/useFilterSupplements';
import { addItem } from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';

// import { options } from '../../../assets/options';
import { ProductDescription } from './ProductDescription';
import { ProductFooter } from './ProductFooter';
import css from './ProductListItem.module.scss';
import { ProductOptionsList } from './ProductOptionsList';
import { ProductQuantity } from './ProductQuantity';

type ProductListItemProps = {
  item: Product;
  supplements: Supplement[];
  preview?: boolean;
};

export function ProductListItem({
  item,
  supplements,
  preview = false,
}: ProductListItemProps) {
  const { _id, price, promotion, promPrice, category, vegan } = item;

  const [totalPrice, setTotalPrice] = useState(price);
  const [totalPromPrice, setTotalPromPrice] = useState(promPrice);
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [optionsShown, setOptionsShown] = useState(false);
  const [optionsArray, setOptionsArray] = useState<Supplement[]>([]);
  const [optionsSum, setOptionsSum] = useState(0);

  const dispatch = useAppDispatch();

  const getTotalQuantity = (quantity: number) => {
    setTotalQuantity(quantity);
    setTotalPrice((price + optionsSum) * quantity);
    setTotalPromPrice((promPrice + optionsSum) * quantity);
  };

  const optionsTitles = optionsArray.map(option => option.title);

  const addToCart = () => {
    const { photo, title, _id } = item;
    const cartItem = {
      _id,
      photo,
      title,
      quantity: totalQuantity,
      optionsTitles,
      totalPrice: promotion ? totalPromPrice : totalPrice,
    };
    dispatch(addItem(cartItem));
    toast.success('Додано до кошика', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
    });
  };

  const handleShowOptions = () => {
    setOptionsShown(!optionsShown);
  };

  const handleChooseOptions = (e: ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    const optionData = supplements.find(item => item.title === e.target.value);

    if (optionData && optionData.price) {
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

  const { filteredSupplements } = useFilterSupplements({
    supplements,
    category,
    vegan,
  });

  useEffect(() => {
    !optionsShown && setOptionsArray([]);
    setOptionsSum(0);
  }, [optionsShown]);

  return (
    <article className={css.listItem}>
      <ProductDescription item={item} preview={preview} />
      <ProductQuantity
        filteredSupplements={filteredSupplements}
        getTotalQuantity={getTotalQuantity}
        handleChange={handleShowOptions}
        supplements={supplements}
        category={category}
        _id={_id}
      />
      {optionsShown && (
        <ProductOptionsList
          filteredSupplements={filteredSupplements}
          handleChange={handleChooseOptions}
        />
      )}
      <ProductFooter
        preview={preview}
        promotion={promotion}
        totalPrice={totalPrice}
        totalPromPrice={totalPromPrice}
        addToCart={addToCart}
      />
    </article>
  );
}
