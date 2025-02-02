'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { getUserInfo } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';
import { createSupplement } from '@/store/products/productsOperations';

import { Button } from '@/components/shared/Button';
import { Checkbox } from '@/components/shared/Checkbox';
import { Input } from '@/components/shared/Input';

import css from './SupplementForm.module.scss';

export function SupplementForm() {
  const defaultValues: SupplementDto = {
    title: '',
    price: null,
    for_category: 'Піца',
    vegan: false,
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Supplement>({ mode: 'onChange', defaultValues });

  const user = useAppSelector(getUserInfo);

  const onSubmit: SubmitHandler<Supplement> = data => {
    console.log(data);
    if (user && user.sub) {
      createSupplement(data, user.sub);
      toast.success('Товар додано');
    }
  };

  const categories = ['Піца', 'Закуски'];

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>Додати опцію</h3>
      <Input
        {...register('title', {
          required: "Це обов'язкове поле!",
          validate: {
            required: value => value.trim().length > 1 || 'Введіть назву',
          },
        })}
        placeholder="Введіть назву"
        id="title"
        label="* Назва"
        htmlFor="title"
        error={errors?.title?.message}
        inputMode="text"
        type="text"
      />
      <Input
        {...register('price', {
          required: "Це обов'язкове поле!",
          validate: {
            required: value => (value && value > 0) || 'Введіть ціну',
          },
        })}
        placeholder="Введіть ціну"
        id="price"
        label="* Ціна"
        htmlFor="price"
        error={errors?.price?.message}
        inputMode="text"
        type="text"
      />

      <div>
        <h3>Для категорії</h3>
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

      <div>
        <h3>Тип</h3>
        <Checkbox
          {...register('vegan')}
          id="vegan"
          htmlFor="vegan"
          label="Веганська"
        />
      </div>

      <span>* обов&apos;язкові поля</span>
      <Button type="submit" disabled={!isValid}>
        Підтвердити
      </Button>
    </form>
  );
}
