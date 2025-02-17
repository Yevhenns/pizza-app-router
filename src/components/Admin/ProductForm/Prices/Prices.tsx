import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/shared/Input/Input';

type PricesProps = {
  register: UseFormRegister<ProductCreateDto>;
  errors: FieldErrors<ProductCreateDto>;
};

export function Prices({ register, errors }: PricesProps) {
  return (
    <>
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

      <Input
        {...register('promPrice', {
          required: "Це обов'язкове поле!",
          validate: {
            required: value => (value && value > 0) || 'Введіть ціну',
          },
        })}
        placeholder="Введіть ціну зі знижкою"
        id="promPrice"
        label="* Ціна зі знижкою"
        htmlFor="promPrice"
        error={errors?.promPrice?.message}
        inputMode="text"
        type="text"
      />
    </>
  );
}
