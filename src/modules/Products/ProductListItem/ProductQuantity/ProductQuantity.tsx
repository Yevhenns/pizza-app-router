'use client';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { RoundButton } from '@/UI/basic/RoundButton';
import { Icon } from '@/UI/basic/Icon';
import { Checkbox } from '@/UI/basic/Checkbox';
import css from './ProductQuantity.module.scss';

interface ProductQuantityProps {
  getTotalQuantity: (quantity: number) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  options?: PizzaOptions;
}

export function ProductQuantity({
  getTotalQuantity,
  handleChange,
  options,
}: ProductQuantityProps) {
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
      <div className={css.quantity}>
        <RoundButton
          onClick={decrement}
          disabled={quantity === 1}
          aria-label="minus"
        >
          <Icon svg="left" iconWidth={24} iconHeight={24} color="accent" />
        </RoundButton>
        <span>{quantity} шт.</span>
        <RoundButton onClick={increment} aria-label="plus">
          <Icon svg="right" iconWidth={24} iconHeight={24} color="accent" />
        </RoundButton>
      </div>
      {options && (
        <div className={css.quantity}>
          <Checkbox
            htmlFor="options"
            label="Опції"
            posRight
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
        </div>
      )}
    </div>
  );
}
