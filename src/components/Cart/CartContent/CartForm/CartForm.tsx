import { HTMLProps } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { formatPhoneNumber } from '@/helpers/formatPhoneNumber';
import { getUserInfo } from '@/store/auth/authSlice';
import { sendOrder } from '@/store/cart/cartOperations';
import { addInfo, getCustomerInfo, getOrderSum } from '@/store/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useMask } from '@react-input/mask';

import { Button } from '@/components/shared/Button';
import { Checkbox } from '@/components/shared/Checkbox';
import { GoogleMapsInput } from '@/components/shared/GoogleMapsInput';
import { Input } from '@/components/shared/Input';
import { TextArea } from '@/components/shared/TextArea';

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
  } = useForm<CustomerInfoWithGps>({ mode: 'onChange' });

  const customerInfo = useAppSelector(getCustomerInfo);
  const orderSum = useAppSelector(getOrderSum);
  const userId = useAppSelector(getUserInfo)?._id;

  const dispatch = useAppDispatch();

  const phoneInputRef = useMask({
    mask: '+38(___) ___-__-__',
    replacement: { _: /\d/ },
  });

  const phoneNumberLength = 18;

  const onSubmit: SubmitHandler<CustomerInfoWithGps> = ({
    address,
    comment,
    name,
    number,
  }) => {
    openModal();
    const customerInfo: CustomerInfo = {
      address: address?.formatted,
      comment,
      name,
      number: formatPhoneNumber(number),
      userId,
    };
    const reqBody: SummaryOrder = { customerInfo, order, orderSum };
    dispatch(sendOrder(reqBody));
  };

  const delivery = watch('delivery');
  const address = watch('address');
  console.log(address);

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
          defaultValue={customerInfo.number || ''}
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
              placeholder="099 999 99 99"
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
            defaultValue={{
              formatted: '',
              lat: 0,
              lng: 0,
              name: '',
              city: 'Дніпро',
            }}
            rules={{
              validate: value =>
                value && value?.formatted?.trim().length > 0
                  ? true
                  : 'Введіть адресу',
            }}
            render={({ field }) => (
              <GoogleMapsInput
                id="address"
                placeholder="Введіть адресу"
                label="* Введіть адресу і оберіть зі списку"
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
          maxLength={200}
          placeholder="Введіть коментар"
          label="Коментар"
          htmlFor="comment"
        />
        <span>* обов&apos;язкові поля</span>
      </div>

      <Button type="submit" disabled={!isValid}>
        Підтвердити
      </Button>
    </form>
  );
}
