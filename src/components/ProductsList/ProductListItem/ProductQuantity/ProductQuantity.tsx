import { useEffect, useState } from 'react';

import { Icon } from '@/components/shared/Icon/Icon';
import { RoundButton } from '@/components/shared/RoundButton/RoundButton';

import css from './ProductQuantity.module.scss';

type ProductQuantityProps = {
  getTotalQuantity: (quantity: number) => void;
  handleChange: () => void;
  supplements: Supplement[] | [];
  category: string;
  filteredSupplements: Supplement[];
  optionsShown: boolean;
};

export function ProductQuantity({
  getTotalQuantity,
  handleChange,
  supplements = [],
  category,
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
          <span className={css.quantityText}>-</span>
        </RoundButton>
        <span>{quantity} шт.</span>
        <RoundButton onClick={increment} aria-label="plus">
          <span className={css.quantityText}>+</span>
        </RoundButton>
      </div>
      {isSupplementsShown && supplements.length > 0 && (
        <div className={css.quantity}>
          <span>Опції</span>
          <RoundButton onClick={handleChange}>
            {!optionsShown ? (
              <div className={css.down}>
                <Icon
                  svg="right"
                  iconWidth={20}
                  iconHeight={20}
                  color="accent"
                />
              </div>
            ) : (
              <div className={css.up}>
                <Icon
                  svg="right"
                  iconWidth={20}
                  iconHeight={20}
                  color="accent"
                />
              </div>
            )}
          </RoundButton>
        </div>
      )}
    </div>
  );
}
