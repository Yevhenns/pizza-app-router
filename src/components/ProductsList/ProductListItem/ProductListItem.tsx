import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { addItem } from '@/redux/cart/cartSlice';
import { useAppDispatch } from '@/redux/hooks';

import { options } from '../../../assets/options';
import { ProductDescription } from './ProductDescription';
import { ProductFooter } from './ProductFooter';
import css from './ProductListItem.module.scss';
import { ProductOptionsList } from './ProductOptionsList';
import { ProductQuantity } from './ProductQuantity';

type ProductListItemProps = {
  item: Product;
};

export function ProductListItem({ item }: ProductListItemProps) {
  const { _id, price, promotion, promPrice, category, vegan } = item;

  const [totalPrice, setTotalPrice] = useState(price);
  const [totalPromPrice, setTotalPromPrice] = useState(promPrice);
  const [totalQuantity, setTotalQuantity] = useState(1);
  const [optionsShown, setOptionsShown] = useState(false);
  const [optionsArray, setOptionsArray] = useState<Option[]>([]);
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

  const handleShowOptions = () => {
    setOptionsShown(!optionsShown);
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
    !optionsShown && setOptionsArray([]);
    setOptionsSum(0);
  }, [optionsShown]);

  return (
    <article className={css.listItem}>
      <ProductDescription item={item} />
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
