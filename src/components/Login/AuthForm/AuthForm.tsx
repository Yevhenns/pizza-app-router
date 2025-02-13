import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Image from 'next/image';

import { parseError } from '@/helpers/parseError';
import { isValidEmail, isValidPassword } from '@/helpers/validation';
import { signIn, signUp } from '@/store/auth/authOperations';
import { addUserInfo } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';

import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';

import css from './AuthForm.module.scss';

type AuthFormProps = {
  type: 'login' | 'register';
};

export function AuthForm({ type }: AuthFormProps) {
  const [idiShown, setIdiShown] = useState(false);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<Auth>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<Auth> = async data => {
    const lastThreeChars = data.email.slice(-3) === '.ru';

    if (lastThreeChars) {
      setIdiShown(true);
      return;
    }

    try {
      if (type === 'register') {
        const response = await signUp(data);
        dispatch(addUserInfo(response));

        return toast.success('Реєстрація виконана успішно', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: true,
          closeButton: false,
        });
      }
      if (type === 'login') {
        const response = await signIn(data);
        dispatch(addUserInfo(response));

        return toast.success('Вхід виконано успішно', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: true,
          closeButton: false,
        });
      }
    } catch (error: any) {
      console.error('Помилка при реєстрації:', error);

      return toast.error(parseError(error), {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeButton: false,
      });
    }
  };

  if (idiShown)
    return <Image src={'/idi.webp'} alt="idi" width={523} height={356} />;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <Input
        {...register('email', {
          required: "Це обов'язкове поле!",
          validate: value => isValidEmail(value.trim()) || 'Введіть Email',
        })}
        placeholder="Введіть Email"
        id="email"
        label="Email"
        htmlFor="email"
        error={errors?.email?.message}
        inputMode="email"
        type="email"
      />

      <Input
        {...register('password', {
          required: "Це обов'язкове поле!",
          validate: value =>
            isValidPassword(value.trim()) || '8 символів, літери і цифри',
        })}
        placeholder="Введіть пароль"
        id="password"
        label="Пароль"
        htmlFor="password"
        error={errors?.password?.message}
        inputMode="text"
        forPassword
      />

      {type === 'register' && (
        <Input
          {...register('repeatPassword', {
            required: "Це обов'язкове поле!",
            validate: value =>
              value === getValues('password') || 'Паролі не співпадають',
          })}
          placeholder="Введіть пароль"
          id="repeatPassword"
          label="Повторіть пароль"
          htmlFor="repeatPassword"
          error={errors?.repeatPassword?.message}
          inputMode="text"
          forPassword
        />
      )}

      <Button type="submit" disabled={!isValid}>
        {type === 'login' ? 'Увійти' : 'Зареєструватися'}
      </Button>
    </form>
  );
}
