import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Image from 'next/image';

import { parseError } from '@/helpers/parseError';
import { isValidEmail, isValidPassword } from '@/helpers/validation';
import { repeatVerifyEmail, signIn, signUp } from '@/store/auth/authOperations';
import { addUserInfo } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';

import { Button } from '@/components/shared/Button/Button';
import { Input } from '@/components/shared/Input/Input';
import { LoaderModal } from '@/components/shared/LoaderModal/LoaderModal';

import css from './AuthForm.module.scss';

type AuthFormProps = {
  type: 'login' | 'register';
  showRecoveryForm?: () => void;
};

export function AuthForm({ type, showRecoveryForm }: AuthFormProps) {
  const [idiShown, setIdiShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notVerified, setNotVerified] = useState(false);

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<Auth>({ mode: 'onChange' });

  const email = watch('email');
  const password = watch('password');

  const repeatSendVerifyEmail = async () => {
    setIsLoading(true);
    const body = {
      email,
      password,
    };
    try {
      const response = await repeatVerifyEmail(body);
      dispatch(addUserInfo(response));

      setIsLoading(false);
      setNotVerified(false);

      return toast.success('Перевірте пошту', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeButton: false,
      });
    } catch (error) {
      setIsLoading(false);
      return toast.error(parseError(error), {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeButton: false,
      });
    }
  };

  const onSubmit: SubmitHandler<Auth> = async data => {
    const lastThreeChars = data.email.slice(-3) === '.ru';

    if (lastThreeChars) {
      setIdiShown(true);
      return;
    }

    setIsLoading(true);
    try {
      if (type === 'register') {
        const response = await signUp(data);
        console.log(response);

        setIsLoading(false);

        reset();

        return toast.success('Реєстрація успішна. Перевірте пошту', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: true,
          closeButton: false,
        });
      }
      if (type === 'login') {
        const response = await signIn(data);
        dispatch(addUserInfo(response));
        setIsLoading(false);

        return toast.success('Вхід виконано успішно', {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: true,
          closeButton: false,
        });
      }
    } catch (error: any) {
      console.error('Помилка при реєстрації:', error);
      setIsLoading(false);
      console.log('status', error.status);

      if (error.status === 403) {
        setNotVerified(true);
      }

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
      {isLoading && <LoaderModal />}
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

      {type === 'register' ? (
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
      ) : (
        <button
          type="button"
          className={css.showRecoveryBtn}
          onClick={showRecoveryForm}
        >
          Забули пароль?
        </button>
      )}

      {notVerified && (
        <Button
          type="button"
          disabled={!isValid}
          onClick={repeatSendVerifyEmail}
        >
          Надіслати повторно
        </Button>
      )}

      {!notVerified && (
        <Button type="submit" disabled={!isValid}>
          {type === 'login' ? 'Увійти' : 'Зареєструватися'}
        </Button>
      )}
    </form>
  );
}
