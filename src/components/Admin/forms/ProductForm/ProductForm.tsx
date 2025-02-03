'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { useHideAdmin } from '@/hooks/useHideAdmin';
import { getUserInfo } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';
import {
  createProduct,
  deleteProductById,
} from '@/store/products/productsOperations';

import { Button } from '@/components/shared/Button';
import { Checkbox } from '@/components/shared/Checkbox';
import { Input } from '@/components/shared/Input';
import { TextArea } from '@/components/shared/TextArea';

import css from './ProductForm.module.scss';

type ProductFormProps = {
  products?: Product[];
};

export function ProductForm({ products }: ProductFormProps) {
  const { _id: productId } = useParams<{ _id: string }>();
  const router = useRouter();
  useHideAdmin();

  const product = products?.find(item => item._id === productId);

  const defaultValues: ProductDto = product
    ? {
        title: product.title,
        category: product.category,
        description: product.description,
        dimension: product.dimension,
        promotion: product.promotion,
        promPrice: product.promPrice,
        price: product.price,
        vegan: product.vegan,
        photo: product.photo,
      }
    : {
        title: '',
        category: 'Піца',
        description: '',
        dimension: '',
        promotion: false,
        promPrice: null,
        price: null,
        vegan: false,
        photo: null,
      };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ProductDto>({ mode: 'onChange', defaultValues });

  const user = useAppSelector(getUserInfo);
  const userId = user?.sub;

  const onSubmit: SubmitHandler<ProductDto> = data => {
    console.log(data);
    if (!productId && user && userId) {
      createProduct(data, userId)
        .then(() => {
          toast.success('Товар додано');
          router.refresh();
        })
        .catch(error => {
          console.log(error);
          toast.error('Сталася помилка');
        });
    }
    if (productId && user && userId) {
      createProduct(data, userId)
        .then(() => {
          toast.success('Товар оновлено');
          deleteProductById(productId, userId).then(() => {
            router.refresh();
          });
        })
        .catch(error => {
          console.log(error);
          toast.error('Сталася помилка');
        });
    }
    router.push('/admin');
  };

  const categories = ['Піца', 'Закуски', 'Напої'];
  const vegan = watch('vegan');
  const veganText = vegan ? 'Так' : 'Ні';
  const promotion = watch('promotion');
  const promotionText = promotion ? 'Так' : 'Ні';
  const photo = watch('photo');

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.imageWrapper}>
        {photo ? (
          <Image src={photo} alt="Preview" width={200} height={200} priority />
        ) : (
          <Image
            src="/200.svg"
            alt="Preview"
            width={200}
            height={200}
            priority
          />
        )}

        <CldUploadWidget
          uploadPreset="nostra"
          options={{ clientAllowedFormats: ['png'] }}
          onError={() => {
            toast.error('Додайте файл png');
          }}
          onSuccess={result => {
            typeof result.info === 'object' &&
              setValue('photo', result.info.secure_url);
          }}
        >
          {({ open }) => {
            return <Button onClick={() => open()}>Завантажити фото</Button>;
          }}
        </CldUploadWidget>
      </div>

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
      </div>

      <hr />

      <span>* обов&apos;язкові поля</span>
      <Button type="submit" disabled={!isValid}>
        Підтвердити
      </Button>
    </form>
  );
}
