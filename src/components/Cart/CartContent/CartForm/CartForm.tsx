import { HTMLProps } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { formatPhoneNumber } from '@/helpers/formatPhoneNumber';
import { getUserInfo } from '@/store/auth/authSlice';
import { sendOrder } from '@/store/cart/cartOperations';
import { addInfo, getCustomerInfo, getOrderSum } from '@/store/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useMask } from '@react-input/mask';

import { Button } from '@/components/shared/Button/Button';
import { Checkbox } from '@/components/shared/Checkbox/Checkbox';
import { Input } from '@/components/shared/Input/Input';
import { TextArea } from '@/components/shared/TextArea/TextArea';

import css from './CartForm.module.scss';

type CartFormProps = {
  openModal: () => void;
  order: Ordered[];
} & HTMLProps<HTMLFormElement>;

export function CartForm({ openModal, order }: CartFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    control,
  } = useForm<CustomerInfo>({ mode: 'onChange' });

  const customerInfo = useAppSelector(getCustomerInfo);
  const orderSum = useAppSelector(getOrderSum);
  const userId = useAppSelector(getUserInfo)?._id;

  const dispatch = useAppDispatch();

  const phoneInputRef = useMask({
    mask: '+38(0__) ___-__-__',
    replacement: { _: /\d/ },
  });

  const phoneNumberLength = 18;

  const onSubmit: SubmitHandler<CustomerInfo> = ({
    address,
    comment,
    name,
    number,
  }) => {
    openModal();
    const customerInfo: CustomerInfo = {
      address,
      comment,
      name,
      number: formatPhoneNumber(number),
      userId,
    };
    const reqBody: SummaryOrder = { customerInfo, order, orderSum };
    dispatch(sendOrder(reqBody));
  };

  const delivery = watch('delivery');

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Controller
          name="name"
          control={control}
          defaultValue={customerInfo.name || ''}
          rules={{
            required: "Це обов'язкове поле!",
            validate: value => value.trim().length > 1 || "Введіть ім'я",
          }}
          render={({ field }) => (
            <Input
              {...field}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e);
                dispatch(addInfo({ ...customerInfo, name: e.target.value }));
              }}
              maxLength={50}
              placeholder="Введіть ім'я"
              id="customer-name"
              label="* Ім'я"
              htmlFor="customer-name"
              error={errors?.name?.message}
              inputMode="text"
              type="text"
            />
          )}
        />

        <Controller
          name="number"
          control={control}
          defaultValue={customerInfo.number || '+38(0'}
          rules={{
            required: "Це обов'язкове поле!",
            validate: value =>
              value.length === phoneNumberLength || 'Введіть номер телефону',
          }}
          render={({ field }) => (
            <Input
              {...field}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                field.onChange(e);
                dispatch(addInfo({ ...customerInfo, number: e.target.value }));
              }}
              ref={phoneInputRef}
              placeholder="+380"
              id="number"
              htmlFor="number"
              type="tel"
              label="* Номер телефону"
              error={errors?.number?.message}
            />
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
          <Controller
            name="address"
            control={control}
            defaultValue={customerInfo.address || ''}
            rules={{
              required: "Це обов'язкове поле!",
              validate: value =>
                (value && value.length >= 5) || 'Введіть адресу',
            }}
            render={({ field }) => (
              <Input
                {...field}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  field.onChange(e);
                  dispatch(
                    addInfo({ ...customerInfo, address: e.target.value })
                  );
                }}
                placeholder="Калинова 70/12"
                id="address"
                htmlFor="address"
                type="text"
                label="* Адреса"
                error={errors?.address?.message}
              />
            )}
          />
        )}

        <Controller
          name="comment"
          control={control}
          defaultValue={customerInfo.comment || ''}
          render={({ field }) => (
            <TextArea
              {...field}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                field.onChange(e);
                dispatch(addInfo({ ...customerInfo, comment: e.target.value }));
              }}
              placeholder="Введіть коментар"
              maxLength={200}
              id="comment"
              htmlFor="comment"
              type="text"
              label="Коментар"
              error={errors?.comment?.message}
            />
          )}
        />

        <span>* - обов&apos;язкові поля</span>
      </div>

      <Button type="submit" disabled={!isValid}>
        Підтвердити
      </Button>
    </form>
  );
}
