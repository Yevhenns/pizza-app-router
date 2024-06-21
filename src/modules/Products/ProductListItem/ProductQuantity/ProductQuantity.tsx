import React, { FC, useState, useEffect } from 'react';
import RoundButton from '@/UI/basic/RoundButton/RoundButton';
import css from './ProductQuantity.module.scss';
import Icon from '@/UI/basic/Icon/Icon';

interface Props {
  getTotalQuantity: (quantity: number) => void;
}

const ProductQuantity: FC<Props> = ({ getTotalQuantity }) => {
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
};

export default ProductQuantity;
