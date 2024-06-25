/* eslint-disable react/no-unescaped-entities */
import { HTMLProps } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addInfo, getOrderSum } from '@/redux/cart/cartSlice';
import { sendOrder } from '@/redux/cart/cartOperations';
import { Button } from '@/UI/basic/Button';
import { TextArea } from '@/UI/basic/TextArea';
import { Checkbox } from '@/UI/basic/Checkbox';
import { Input } from '@/UI/basic/Input';
import css from './CartForm.module.scss';

interface CartFormProps extends HTMLProps<HTMLFormElement> {
  openModal: () => void;
  order: TOrdered;
}

export function CartForm({ openModal, order }: CartFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<TInfo>({ mode: 'onChange' });

  const orderSum = useAppSelector(getOrderSum);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<TInfo> = data => {
    openModal();
    const customerInfo: TInfo = {
      address: data.address,
      comment: data.comment,
      delivery: data.delivery,
      name: data.name,
      number: data.number,
    };
    dispatch(addInfo(customerInfo));
    const reqBody: TSummaryOrder = { customerInfo, order, orderSum };
    dispatch(sendOrder(reqBody));
  };

  const delivery = watch('delivery');

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('name', {
          required: "Це обов'язкове поле!",
          validate: {
            required: value => value.trim().length > 1 || "Введіть ім'я",
          },
        })}
        placeholder="Введіть ім'я"
        id="customer-name"
        label="* Ім'я"
        htmlFor="customer-name"
        error={errors?.name?.message}
        inputMode="text"
        type="text"
      />
      <Input
        {...register('number', {
          required: "Це обов'язкове поле!",
          minLength: {
            value: 10,
            message: 'Замало цифр',
          },
          maxLength: {
            value: 10,
            message: 'Забагато цифр',
          },
        })}
        pattern="[0-9]{10}"
        placeholder="Введіть номер телефону"
        id="customer-number"
        label="* Номер телефону в форматі: 0991115533"
        htmlFor="customer-number"
        type="tel"
        error={errors?.number?.message}
        inputMode="tel"
      />
      <Checkbox
        {...register('delivery')}
        id="delivery"
        htmlFor="delivery"
        label="Доставка"
      />
      {delivery && (
        <Input
          {...register('address', {
            required: "Це обов'язкове поле!",
          })}
          id="address"
          label="* Введіть адресу"
          placeholder="Введіть адресу"
          htmlFor="address"
          error={errors?.address?.message}
        />
      )}
      <TextArea
        {...register('comment')}
        id="comment"
        placeholder="Введіть коментар"
        label="Коментар"
        htmlFor="comment"
      />
      <span>* обов'язкові поля</span>
      <Button type="submit" disabled={!isValid}>
        Підтвердити
      </Button>
    </form>
  );
}
