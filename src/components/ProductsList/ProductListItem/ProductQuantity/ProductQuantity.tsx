import { ChangeEvent, useEffect, useState } from 'react';

import { Checkbox } from '@/components/shared/Checkbox';
import { Icon } from '@/components/shared/Icon';
import { RoundButton } from '@/components/shared/RoundButton';

import css from './ProductQuantity.module.scss';

type ProductQuantityProps = {
  getTotalQuantity: (quantity: number) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  options?: Option[] | [];
  category: string;
  _id: string;
};

export function ProductQuantity({
  getTotalQuantity,
  handleChange,
  options = [],
  category,
  _id,
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
      {category === 'Піца' && options.length > 0 && (
        <div className={css.quantity}>
          <Checkbox
            htmlFor={_id}
            name="options"
            id={_id}
            label="Опції"
            posRight
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
          />
        </div>
      )}
    </div>
  );
}
