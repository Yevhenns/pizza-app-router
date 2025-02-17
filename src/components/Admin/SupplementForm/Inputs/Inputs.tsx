import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/shared/Input/Input';

type InputsProps = {
  register: UseFormRegister<SupplementCreateDto>;
  errors: FieldErrors<SupplementCreateDto>;
};

export function Inputs({ register, errors }: InputsProps) {
  return (
    <>
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
    </>
  );
}
