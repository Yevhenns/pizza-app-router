import { ChangeEvent, useEffect, useState } from 'react';

import { Checkbox } from '@/components/shared/Checkbox';

import css from './ProductOptionsList.module.scss';

type ProductOptionsListProps = {
  options: Option[];
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  vegan: boolean;
};

export function ProductOptionsList({
  options,
  handleChange,
  vegan,
}: ProductOptionsListProps) {
  const [filteredByVegan, setFilteredByVegan] = useState<Option[]>([]);

  useEffect(() => {
    if (!vegan) {
      setFilteredByVegan(options);
    } else {
      const filteredArray = options.filter(item => item.vegan === vegan);
      setFilteredByVegan(filteredArray);
    }
  }, [options, vegan]);

  return (
    <div className={css.wrapper}>
      {filteredByVegan.map(item => {
        return (
          <div key={item.id} className={css.item}>
            <Checkbox
              htmlFor={item.id}
              name="option"
              id={item.id}
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
