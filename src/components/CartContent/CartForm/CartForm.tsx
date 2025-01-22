import { HTMLProps } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { getUserInfo } from '@/redux/auth/authSlice';
import { sendOrder } from '@/redux/cart/cartOperations';
import { addInfo, getOrderSum } from '@/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useMask } from '@react-input/mask';

import { Button } from '@/components/basic/Button';
import { Checkbox } from '@/components/basic/Checkbox';
import { GoogleMapsInput } from '@/components/basic/GoogleMapsInput';
import { Input } from '@/components/basic/Input';
import { TextArea } from '@/components/basic/TextArea';

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
    setValue,
    control,
  } = useForm<Info>({ mode: 'onChange' });

  const orderSum = useAppSelector(getOrderSum);
  const userId = useAppSelector(getUserInfo)?.sub;
  const dispatch = useAppDispatch();

  const phoneInputRef = useMask({
    mask: '+38(___)___-__-__',
    replacement: { _: /\d/ },
  });

  const onSubmit: SubmitHandler<Info> = ({
    address,
    comment,
    name,
    number,
  }) => {
    openModal();
    const customerInfo: OrderSubmit = {
      address: address?.formatted,
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
          name="number"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input
              {...field}
              ref={phoneInputRef}
              placeholder="099 999 99 99"
              id="number"
              htmlFor="number"
              type="tel"
              label="* Номер телефону"
              error={errors?.number?.message}
            />
          )}
          rules={{
            required: false,
            validate: value =>
              value.length === 0 ||
              value.length === 17 ||
              'Введіть номер телефону',
          }}
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
            defaultValue={{
              formatted: '',
              lat: 0,
              lng: 0,
              name: '',
              city: 'Дніпро',
            }}
            rules={{
              validate: value =>
                value?.formatted?.trim() ? true : "Це обов'язкове поле!",
            }}
            render={({ field }) => (
              <GoogleMapsInput
                id="address"
                placeholder="Введіть адресу"
                label="* Введіть адресу"
                htmlFor="address"
                error={errors?.address?.message}
                onPlaceSelect={place => {
                  if (!place || !place.geometry) {
                    const emptyValue = {
                      formatted: '',
                      lat: 0,
                      lng: 0,
                      name: '',
                      city: 'Дніпро',
                    };
                    setValue('address', emptyValue);
                    field.onChange(emptyValue);
                    return;
                  }
                  const formattedPlace = {
                    formatted: place.formatted_address || '',
                    lat: place.geometry.location?.lat() || 0,
                    lng: place.geometry.location?.lng() || 0,
                    name: place.name || '',
                    city: 'Дніпро',
                  };
                  setValue('address', formattedPlace);
                  field.onChange(formattedPlace);
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!e.target.value) {
                    const emptyValue = {
                      formatted: '',
                      lat: 0,
                      lng: 0,
                      name: '',
                      city: 'Дніпро',
                    };
                    setValue('address', emptyValue);
                    field.onChange(emptyValue);
                  }
                }}
              />
            )}
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
      <span className={css.requiredFieldsText}>* обов&apos;язкові поля</span>
      <Button type="submit" disabled={!isValid}>
        Підтвердити
      </Button>
    </form>
  );
}
