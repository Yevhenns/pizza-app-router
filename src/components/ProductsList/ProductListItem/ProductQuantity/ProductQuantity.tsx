import { ChangeEvent, useEffect, useState } from 'react';

import { Checkbox } from '@/components/shared/Checkbox/Checkbox';
import { Icon } from '@/components/shared/Icon/Icon';
import { RoundButton } from '@/components/shared/RoundButton/RoundButton';

import css from './ProductQuantity.module.scss';

type ProductQuantityProps = {
  getTotalQuantity: (quantity: number) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  supplements: Supplement[] | [];
  category: string;
  _id: string;
  filteredSupplements: Supplement[];
  optionsShown: boolean;
};

export function ProductQuantity({
  getTotalQuantity,
  handleChange,
  supplements = [],
  category,
  _id,
  filteredSupplements,
  optionsShown,
}: ProductQuantityProps) {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    setQuantity(quantity - 1);
  };

  const isSupplementsShown = filteredSupplements.some(
    item => item.for_category === category
  );

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
        <RoundButton
          onClick={increment}
          disabled={quantity >= 20}
          aria-label="plus"
        >
          <Icon svg="right" iconWidth={24} iconHeight={24} color="accent" />
        </RoundButton>
      </div>
      {isSupplementsShown && supplements.length > 0 && (
        <div className={css.quantity}>
          <Checkbox
            checked={optionsShown}
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
