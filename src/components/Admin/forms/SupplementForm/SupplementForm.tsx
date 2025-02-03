'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useParams, useRouter } from 'next/navigation';

import { useHideAdmin } from '@/hooks/useHideAdmin';
import { getUserInfo } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';
import {
  createSupplement,
  deleteSupplementById,
} from '@/store/products/productsOperations';

import { Button } from '@/components/shared/Button';
import { Checkbox } from '@/components/shared/Checkbox';
import { Input } from '@/components/shared/Input';

import css from './SupplementForm.module.scss';

type SupplementFormProps = {
  supplements?: Supplement[];
};

export function SupplementForm({ supplements }: SupplementFormProps) {
  const { _id: supplementId } = useParams<{ _id: string }>();
  const router = useRouter();
  useHideAdmin();

  const supplement = supplements?.find(item => item._id === supplementId);

  const defaultValues: SupplementDto = supplement
    ? {
        title: supplement.title,
        price: supplement.price,
        for_category: supplement.for_category,
        vegan: supplement.vegan,
      }
    : {
        title: '',
        price: null,
        for_category: 'Піца',
        vegan: false,
      };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<SupplementDto>({ mode: 'onChange', defaultValues });

  const user = useAppSelector(getUserInfo);
  const userId = user?.sub;

  const onSubmit: SubmitHandler<SupplementDto> = data => {
    console.log(data);
    if (!supplementId && user && userId) {
      createSupplement(data, userId)
        .then(() => {
          toast.success('Товар додано');
          router.refresh();
        })
        .catch(error => {
          console.log(error);
          toast.error('Сталася помилка');
        });
    }
    if (supplementId && user && userId) {
      createSupplement(data, userId)
        .then(() => {
          toast.success('Товар оновлено');
          deleteSupplementById(supplementId, userId);
          router.refresh();
        })
        .catch(error => {
          console.log(error);
          toast.error('Сталася помилка');
        });
    }
    router.push('/admin');
  };

  const categories = ['Піца', 'Закуски'];

  const vegan = watch('vegan');
  const veganText = vegan ? 'Так' : 'Ні';

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
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

      <hr />

      <span>* обов&apos;язкові поля</span>
      <Button type="submit" disabled={!isValid}>
        Підтвердити
      </Button>
    </form>
  );
}
