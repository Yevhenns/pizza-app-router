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
import { TextArea } from '@/components/shared/TextArea';

import css from '../SupplementForm/SupplementForm.module.scss';

type ProductFormProps = {
  title: string;
  products?: Product[];
};

export function ProductForm({ title, products }: ProductFormProps) {
  const { _id: productId } = useParams<{ _id: string }>();
  const router = useRouter();
  useHideAdmin();

  const product = products?.find(item => item._id === productId);

  const defaultValues: ProductDto = product
    ? { ...product }
    : {
        title: '',
        category: 'Піца',
        description: '',
        dimension: '',
        photo: '',
        promotion: false,
        promPrice: null,
        price: null,
        vegan: false,
      };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<Product>({ mode: 'onChange', defaultValues });

  const user = useAppSelector(getUserInfo);
  const userId = user?.sub;

  const onSubmit: SubmitHandler<Product> = data => {
    console.log(data);
    // if (!productId && user && userId) {
    //   createSupplement(data, userId)
    //     .then(() => {
    //       toast.success('Товар додано');
    //       router.refresh();
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       toast.error('Сталася помилка');
    //     });
    // }
    // if (productId && user && userId) {
    //   createSupplement(data, userId)
    //     .then(() => {
    //       toast.success('Товар оновлено');
    //       deleteSupplementById(productId, userId);
    //       router.refresh();
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       toast.error('Сталася помилка');
    //     });
    // }
    // router.push('/admin');
  };

  const categories = ['Піца', 'Закуски', 'Напої'];
  const vegan = watch('vegan');
  const veganText = vegan ? 'Так' : 'Ні';
  const promotion = watch('promotion');
  const promotionText = promotion ? 'Так' : 'Ні';

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>{title}</h3>
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

      <div>
        <h3>Категорія</h3>
        {categories.map((item, idx) => {
          return (
            <div key={idx}>
              <Checkbox
                {...register('category')}
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
        <h3>Знижка</h3>
        <Checkbox
          {...register('promotion')}
          id="vegan"
          htmlFor="vegan"
          label={promotionText}
        />
      </div>

      <div>
        <h3>Веганська</h3>
        <Checkbox
          {...register('vegan')}
          id="vegan"
          htmlFor="vegan"
          label={veganText}
        />
      </div>

      <span>* обов&apos;язкові поля</span>
      <Button type="submit" disabled={!isValid}>
        Підтвердити
      </Button>
    </form>
  );
}
