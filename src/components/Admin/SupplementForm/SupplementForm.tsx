'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useParams, useRouter } from 'next/navigation';

import { useHideAdmin } from '@/hooks/useHideAdmin';
import { getUserToken } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';
import {
  createSupplement,
  updateSupplement,
} from '@/store/products/productsOperations';

import { Button } from '@/components/shared/Button/Button';
import { LoaderModal } from '@/components/shared/LoaderModal/LoaderModal';

import { Checkboxes } from './Checkboxes/Checkboxes';
import { Inputs } from './Inputs/Inputs';
import css from './SupplementForm.module.scss';

type SupplementFormProps = {
  supplements?: Supplement[];
};

export function SupplementForm({ supplements }: SupplementFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { _id: supplementId } = useParams<{ _id: string }>();
  const router = useRouter();

  const token = useAppSelector(getUserToken) as string;

  useHideAdmin();

  const supplement = supplements?.find(item => item._id === supplementId);

  const defaultValues: SupplementCreateDto = supplement
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
  } = useForm<SupplementCreateDto>({ mode: 'onChange', defaultValues });

  const onSubmit: SubmitHandler<SupplementCreateDto> = data => {
    if (!supplementId) {
      setIsLoading(true);
      createSupplement(data, token)
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
    if (supplementId) {
      setIsLoading(true);
      updateSupplement(supplementId, data, token)
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

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      {isLoading && <LoaderModal />}
      <Inputs register={register} errors={errors} />
      <Checkboxes watch={watch} register={register} />
      <hr />
      <span>* - обов&apos;язкові поля</span>
      <Button type="submit" disabled={!isValid}>
        Підтвердити
      </Button>
    </form>
  );
}
