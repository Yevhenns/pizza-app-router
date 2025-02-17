import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Image from 'next/image';

import { parseError } from '@/helpers/parseError';
import { isValidEmail } from '@/helpers/validation';
import { passwordRecovery } from '@/store/auth/authOperations';

import { Button } from '@/components/shared/Button/Button';
import { Input } from '@/components/shared/Input/Input';
import { LoaderModal } from '@/components/shared/LoaderModal/LoaderModal';

import css from './PasswordRecoweryForm.module.scss';

type PasswordRecoweryFormProps = {
  showLoginForm: () => void;
};
export function PasswordRecoweryForm({
  showLoginForm,
}: PasswordRecoweryFormProps) {
  const [idiShown, setIdiShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<{ email: string }>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<{ email: string }> = async ({ email }) => {
    const lastThreeChars = email.slice(-3) === '.ru';

    if (lastThreeChars) {
      setIdiShown(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await passwordRecovery(email);
      console.log(response);

      setIsLoading(false);

      reset();

      showLoginForm();

      return toast.success('Пароль оновлено. Перевірте пошту', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeButton: false,
      });
    } catch (error: any) {
      console.error('Помилка при реєстрації:', error);
      setIsLoading(false);
      console.log('status', error.status);

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

      <Button type="submit" disabled={!isValid}>
        Скинути пароль
      </Button>
    </form>
  );
}
