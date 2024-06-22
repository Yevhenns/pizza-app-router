'use client';

import { useState, useEffect } from 'react';
import { RoundButton } from '@/UI/basic/RoundButton';
import { Icon } from '@/UI/basic/Icon';
import css from './ProductQuantity.module.scss';

interface ProductQuantityProps {
  getTotalQuantity: (quantity: number) => void;
}

export function ProductQuantity({ getTotalQuantity }: ProductQuantityProps) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };
  const decrement = () => {
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    getTotalQuantity(quantity);
  }, [getTotalQuantity, quantity]);

  return (
    <div className={css.wrapper}>
      <RoundButton
        onClick={decrement}
        disabled={quantity === 1}
        aria-label="minus"
      >
        <Icon svg="left" iconWidth={24} iconHeight={24} color="accent" />
      </RoundButton>
      <p>{quantity} шт.</p>
      <RoundButton onClick={increment} aria-label="plus">
        <Icon svg="right" iconWidth={24} iconHeight={24} color="accent" />
      </RoundButton>
    </div>
  );
}
