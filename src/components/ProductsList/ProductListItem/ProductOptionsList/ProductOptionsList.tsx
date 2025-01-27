import { ChangeEvent, useEffect, useState } from 'react';

import { Checkbox } from '@/components/shared/Checkbox';

import css from './ProductOptionsList.module.scss';

type ProductOptionsListProps = {
  supplements: Supplement[];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  vegan: boolean;
};

export function ProductOptionsList({
  supplements,
  handleChange,
  vegan,
}: ProductOptionsListProps) {
  const [filteredByVegan, setFilteredByVegan] = useState<Supplement[]>([]);

  useEffect(() => {
    if (!vegan) {
      setFilteredByVegan(supplements);
    } else {
      const filteredArray = supplements.filter(item => item.vegan === vegan);
      setFilteredByVegan(filteredArray);
    }
  }, [supplements, vegan]);

  return (
    <div className={css.wrapper}>
      {filteredByVegan.map(item => {
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
