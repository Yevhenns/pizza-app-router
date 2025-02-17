'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useParams, useRouter } from 'next/navigation';

import { useHideAdmin } from '@/hooks/useHideAdmin';
import { getUserToken } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';
import {
  createProduct,
  updateProduct,
} from '@/store/products/productsOperations';

import { ProductListItem } from '@/components/ProductsList/ProductListItem/ProductListItem';
import { Button } from '@/components/shared/Button/Button';
import { LoaderModal } from '@/components/shared/LoaderModal/LoaderModal';

import { CheckBoxes } from './CheckBoxes/CheckBoxes';
import { Description } from './Description/Description';
import { Prices } from './Prices/Prices';
import css from './ProductForm.module.scss';
import { UploadImage } from './UploadImage/UploadImage';

type ProductFormProps = {
  products?: Product[];
  supplements: Supplement[];
};

export function ProductForm({ products, supplements }: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { _id: productId } = useParams<{ _id: string }>();
  const router = useRouter();

  const token = useAppSelector(getUserToken) as string;

  useHideAdmin();

  const product = products?.find(item => item._id === productId);

  const defaultValues: ProductCreateDto = product
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
        spicy: product.spicy,
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
        photo:
          'https://res.cloudinary.com/dyka4vajb/image/upload/v1698576734/hatamagnata/pizzas/oc1fji52ggplw65qc4rh.png',
        spicy: false,
      };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ProductCreateDto>({
    mode: 'onChange',
    defaultValues,
  });

  const onSubmit: SubmitHandler<ProductCreateDto> = data => {
    if (!productId) {
      setIsLoading(true);
      createProduct(data, token)
        .then(() => {
          toast.success('Товар додано', {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: true,
          });
          router.push('/admin');
          router.refresh();
        })
        .catch(error => {
          console.log(error);
          toast.error('Сталася помилка', {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (productId) {
      setIsLoading(true);
      updateProduct(productId, data, token)
        .then(() => {
          toast.success('Товар оновлено', {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: true,
          });
          router.push('/admin');
          router.refresh();
        })
        .catch(error => {
          console.log(error);
          toast.error('Сталася помилка', {
            position: 'top-center',
            autoClose: 1500,
            hideProgressBar: true,
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const categories = ['Піца', 'Закуски', 'Напої', 'Суші'];
  const vegan = watch('vegan');
  const promotion = watch('promotion');
  const spicy = watch('spicy');
  const photo = watch('photo');
  const title = watch('title');
  const description = watch('description');
  const category = watch('category');
  const promPrice = watch('promPrice');
  const price = watch('price');
  const dimension = watch('dimension');

  const item = {
    _id: '1',
    title,
    category,
    description,
    dimension,
    promotion,
    promPrice: (promPrice && +promPrice) || 0,
    price: (price && +price) || 0,
    vegan,
    photo,
    spicy,
  } as Product;

  return (
    <div className={css.formWrapper}>
      {isLoading && <LoaderModal />}
      <div className={css.cardWrapper}>
        <ProductListItem item={item} supplements={supplements} preview />
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <UploadImage setValue={setValue} />
        </div>
        <Description register={register} errors={errors} />
        <Prices register={register} errors={errors} />
        <CheckBoxes
          categories={categories}
          register={register}
          spicy={spicy}
          promotion={promotion}
          vegan={vegan}
        />
        <hr />
        <span>* - обов&apos;язкові поля</span>
        <Button type="submit" disabled={!isValid}>
          Підтвердити
        </Button>
      </form>
    </div>
  );
}
