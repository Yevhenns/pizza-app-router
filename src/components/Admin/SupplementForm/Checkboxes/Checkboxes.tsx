import { UseFormRegister, UseFormWatch } from 'react-hook-form';

import { Checkbox } from '@/components/shared/Checkbox/Checkbox';

import css from './Checkboxes.module.scss';

type CheckboxesProps = {
  watch: UseFormWatch<SupplementCreateDto>;
  register: UseFormRegister<SupplementCreateDto>;
};

export function Checkboxes({ watch, register }: CheckboxesProps) {
  const categories = ['Піца', 'Закуски'];
  const vegan = watch('vegan');
  const veganText = vegan ? 'Так' : 'Ні';

  return (
    <div className={css.wrapper}>
      <div className={css.checkboxWrapper}>
        <p>Для категорії</p>
        {categories.map((item, idx) => {
          return (
            <div key={idx}>
              <Checkbox
                {...register('for_category')}
                type="radio"
                htmlFor={item}
                name="for_category"
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
    </div>
  );
}
