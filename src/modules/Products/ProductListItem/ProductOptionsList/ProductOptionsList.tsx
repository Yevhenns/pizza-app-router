import { Checkbox } from '@/UI/basic/Checkbox';
import css from './ProductOptionsList.module.scss';
import { ChangeEvent, useState } from 'react';

type ProductOptionsListProps = {
  options: PizzaOptions;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function ProductOptionsList({
  options = [],
  handleChange,
}: ProductOptionsListProps) {
  return (
    <div className={css.wrapper}>
      {options.map(item => {
        return (
          <div key={item.id} className={css.item}>
            <Checkbox
              label={item.title}
              value={item.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <span>{item.price} грн</span>
          </div>
        );
      })}
    </div>
  );
}
