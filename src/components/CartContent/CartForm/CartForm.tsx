/* eslint-disable react/no-unescaped-entities */
import { HTMLProps } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { getUserInfo } from '@/redux/auth/authSlice';
import { sendOrder } from '@/redux/cart/cartOperations';
import { addInfo, getOrderSum } from '@/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { Button } from '@/components/basic/Button';
import { Checkbox } from '@/components/basic/Checkbox';
import { Input } from '@/components/basic/Input';
import { TextArea } from '@/components/basic/TextArea';

import inputCss from '../../../components/basic/Input/Input.module.scss';
import css from './CartForm.module.scss';

type CartFormProps = {
  openModal: () => void;
  order: Ordered;
} & HTMLProps<HTMLFormElement>;

export function CartForm({ openModal, order }: CartFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    control,
  } = useForm<Info>({ mode: 'onChange' });

  const orderSum = useAppSelector(getOrderSum);
  const userId = useAppSelector(getUserInfo)?.sub;
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<Info> = ({
    address,
    comment,
    name,
    number,
  }) => {
    openModal();
    const customerInfo: Info = {
      address,
      comment,
      name,
      number,
      userId,
    };
    dispatch(addInfo(customerInfo));
    const reqBody: SummaryOrder = { customerInfo, order, orderSum };
    dispatch(sendOrder(reqBody));
  };

  const delivery = watch('delivery');

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
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
        <Controller
          control={control}
          name="number"
          rules={{
            required: "Це обов'язкове поле!",
            validate: {
              required: value => !value.includes('_'),
            },
          }}
          render={({ field: { onChange, onBlur, ref } }) => (
            <div className={inputCss.fieldset}>
              <label htmlFor="customer-number">* Номер телефону</label>
              <InputMask
                maskPlaceholder={null}
                placeholder="(099) 999-99-99"
                mask="(099) 999-99-99"
                onBlur={onBlur}
                onChange={onChange}
                inputRef={ref}
                type="tel"
                id="customer-number"
              />
              <div>{errors.number && <span>{errors.number.message}</span>}</div>
            </div>
          )}
        />
        <Checkbox
          {...register('delivery')}
          id="delivery"
          htmlFor="delivery"
          label="Доставка"
        />
      </div>
      <div>
        {delivery && (
          <Input
            {...register('address', {
              required: "Це обов'язкове поле!",
              minLength: {
                value: 3,
                message: 'Введіть адресу',
              },
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
      </div>
      <span>* обов'язкові поля</span>
      <Button type="submit" disabled={!isValid}>
        Підтвердити
      </Button>
    </form>
  );
}
