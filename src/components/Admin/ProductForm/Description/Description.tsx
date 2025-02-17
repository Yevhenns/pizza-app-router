import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/shared/Input/Input';
import { TextArea } from '@/components/shared/TextArea/TextArea';

type DescriptionProps = {
  register: UseFormRegister<ProductCreateDto>;
  errors: FieldErrors<ProductCreateDto>;
};

export function Description({ register, errors }: DescriptionProps) {
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

      <TextArea
        {...register('description', {
          required: "Це обов'язкове поле!",
          validate: {
            required: value => value.trim().length > 1 || 'Введіть опис',
          },
        })}
        placeholder="Введіть опис"
        id="description"
        label="* Опис"
        htmlFor="description"
        error={errors?.description?.message}
        inputMode="text"
        type="text"
      />

      <Input
        {...register('dimension', {
          required: "Це обов'язкове поле!",
          validate: {
            required: value => value.trim().length > 1 || 'Введіть назву',
          },
        })}
        placeholder="Введіть розміри/об'єм"
        id="dimension"
        label="* Розміри/об'єм"
        htmlFor="dimension"
        error={errors?.dimension?.message}
        inputMode="text"
        type="text"
      />
    </>
  );
}
