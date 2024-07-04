import { Checkbox } from '@/UI/basic/Checkbox';
import css from './ProductOptionsList.module.scss';
import { ChangeEvent, useState } from 'react';

type ProductOptionsListProps = {
  options: PizzaOptions;
};

export function ProductOptionsList({ options }: ProductOptionsListProps) {
  const [optionsArray, setOptionsArray] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsOpen(!isOpen);
    const a = e.target.value;
    if (isOpen) {
      if (!optionsArray.includes(a)) {
        setOptionsArray([...optionsArray, a]);
        return;
      }
      return;
    }

    const b = optionsArray.filter(item => item.title === a);
    setOptionsArray(b);
  };
  console.log(optionsArray);

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
