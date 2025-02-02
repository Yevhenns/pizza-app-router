'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';

export function SupplementForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Supplement>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<Supplement> = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            // required: value => value.trim().length > 1 || 'Введіть назву',
          },
        })}
        placeholder="Введіть назву"
        id="price"
        label="* Ціна"
        htmlFor="price"
        error={errors?.price?.message}
        inputMode="text"
        type="text"
      />
      <span>* обов&apos;язкові поля</span>
      <Button type="submit">Підтвердити</Button>
    </form>
  );
}
