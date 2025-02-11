import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { parseError } from '@/helpers/parseError';
import { isValidEmail, isValidPassword } from '@/helpers/validation';
import { signUp } from '@/store/auth/authOperations';
import { addUserInfo } from '@/store/auth/authSlice';
import { useAppDispatch } from '@/store/hooks';

import { Button } from '@/components/shared/Button';
import { Input } from '@/components/shared/Input';

export function AuthForm() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Auth>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<Auth> = async data => {
    try {
      const response = await signUp(data);
      dispatch(addUserInfo(response));
    } catch (error: any) {
      console.error('Помилка при реєстрації:', error);

      return toast.error(parseError(error), {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Реєстрація (тест)</h2>
      <Input
        {...register('email', {
          required: "Це обов'язкове поле!",
          validate: value => isValidEmail(value.trim()) || 'Введіть Email',
        })}
        placeholder="Введіть Email"
        id="email"
        label="* Email"
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
        label="* Пароль"
        htmlFor="password"
        error={errors?.password?.message}
        inputMode="text"
        type="text"
      />

      <Button type="submit" disabled={!isValid}>
        Зареєструватись
      </Button>
    </form>
  );
}
