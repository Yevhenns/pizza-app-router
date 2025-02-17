import { UseFormRegister } from 'react-hook-form';

import { Checkbox } from '@/components/shared/Checkbox/Checkbox';

import css from './CheckBoxes.module.scss';

type CheckBoxesProps = {
  categories: string[];
  register: UseFormRegister<ProductCreateDto>;
  spicy: boolean;
  promotion: boolean;
  vegan: boolean;
};

export function CheckBoxes({
  categories,
  register,
  spicy,
  promotion,
  vegan,
}: CheckBoxesProps) {
  const spicyText = spicy ? 'Так' : 'Ні';
  const promotionText = promotion ? 'Так' : 'Ні';
  const veganText = vegan ? 'Так' : 'Ні';

  return (
    <div className={css.wrapper}>
      <div className={css.checkboxWrapper}>
        <p>Категорія</p>
        {categories.map((item, idx) => {
          return (
            <div key={idx}>
              <Checkbox
                {...register('category')}
                type="radio"
                htmlFor={item}
                name="category"
                id={item}
                label={item}
                value={item}
              />
            </div>
          );
        })}
      </div>

      <div className={css.checkboxWrapper}>
        <p>Веганська</p>
        <Checkbox
          {...register('vegan')}
          id="vegan"
          htmlFor="vegan"
          label={veganText}
        />
      </div>

      <div className={css.checkboxWrapper}>
        <p>Знижка</p>
        <Checkbox
          {...register('promotion')}
          id="promotion"
          htmlFor="promotion"
          label={promotionText}
        />
      </div>

      <div className={css.checkboxWrapper}>
        <p>Гостра</p>
        <Checkbox
          {...register('spicy')}
          id="spicy"
          htmlFor="spicy"
          label={spicyText}
        />
      </div>
    </div>
  );
}
