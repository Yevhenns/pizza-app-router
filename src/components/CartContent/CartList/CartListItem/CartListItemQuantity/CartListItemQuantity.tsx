import { useEffect, useState } from 'react';

import { setQuantityAndPrice } from '@/redux/cart/cartSlice';
import { useAppDispatch } from '@/redux/hooks';

import { Icon } from '@/components/basic/Icon';
import { RoundButton } from '@/components/basic/RoundButton';

import css from './CartListItemQuantity.module.scss';

type CartListItemQuantityProps = {
  chosenQuantity: number;
  cart_id: string;
  price: number;
};

export function CartListItemQuantity({
  chosenQuantity,
  cart_id,
  price,
}: CartListItemQuantityProps) {
  const [quantity, setQuantity] = useState(chosenQuantity);

  const dispatch = useAppDispatch();

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    setQuantity(quantity - 1);
  };

  const pricePerItem = price / chosenQuantity;

  useEffect(() => {
    const totalPrice = quantity * pricePerItem;
    dispatch(setQuantityAndPrice({ cart_id, quantity, totalPrice }));
  }, [cart_id, dispatch, price, pricePerItem, quantity]);

  return (
    <div className={css.quantity}>
      <RoundButton
        onClick={decrement}
        disabled={quantity === 1}
        aria-label="minus"
      >
        <Icon svg="left" iconWidth={24} iconHeight={24} color="accent" />
      </RoundButton>
      <span>{quantity}</span>
      <RoundButton onClick={increment} aria-label="plus">
        <Icon svg="right" iconWidth={24} iconHeight={24} color="accent" />
      </RoundButton>
    </div>
  );
}
