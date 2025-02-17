import { ChangeEvent } from 'react';

import { Checkbox } from '@/components/shared/Checkbox/Checkbox';

import css from './ProductOptionsList.module.scss';

type ProductOptionsListProps = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  filteredSupplements: Supplement[];
};

export function ProductOptionsList({
  handleChange,
  filteredSupplements,
}: ProductOptionsListProps) {
  return (
    <div className={css.wrapper}>
      {filteredSupplements.map(item => {
        return (
          <div key={item._id} className={css.item}>
            <Checkbox
              htmlFor={item._id}
              name="option"
              id={item._id}
              label={item.title}
              value={item.title}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
            />
            <span>+ {item.price} грн</span>
          </div>
        );
      })}
    </div>
  );
}
