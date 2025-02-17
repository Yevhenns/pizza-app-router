import { useEffect, useState } from 'react';

import { setQuantityAndPrice } from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';

import { Icon } from '@/components/shared/Icon/Icon';
import { RoundButton } from '@/components/shared/RoundButton/RoundButton';

import css from './CartListItemQuantity.module.scss';

type CartListItemQuantityProps = {
  chosenQuantity: number;
  cart_id: string;
};

export function CartListItemQuantity({
  chosenQuantity,
  cart_id,
}: CartListItemQuantityProps) {
  const [quantity, setQuantity] = useState(chosenQuantity);

  const dispatch = useAppDispatch();

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    dispatch(setQuantityAndPrice({ cart_id, quantity }));
  }, [cart_id, dispatch, quantity]);

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
      <RoundButton
        onClick={increment}
        disabled={quantity >= 20}
        aria-label="plus"
      >
        <Icon svg="right" iconWidth={24} iconHeight={24} color="accent" />
      </RoundButton>
    </div>
  );
}
