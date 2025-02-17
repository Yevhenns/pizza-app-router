import Link from 'next/link';

import { calculateItemPrice } from '@/helpers/calculateItemPrice';
import {
  getError,
  getIsLoading,
  getOrderSum,
  getUpdatedCartItems,
} from '@/store/cart/cartSlice';
import { useAppSelector } from '@/store/hooks';

import { Button } from '@/components/shared/Button/Button';
import { ConfettiComponent } from '@/components/shared/ConfettiComponent/ConfettiComponent';
import { LoaderModal } from '@/components/shared/LoaderModal/LoaderModal';
import { ModalWrapper } from '@/components/shared/ModalWrapper/ModalWrapper';

import { Error500 } from '../../Error500/Error500';
import css from './FinalModal.module.scss';

type FinalModalProps = {
  finalAction: () => void;
};

export function FinalModal({ finalAction }: FinalModalProps) {
  const updatedCartItems = useAppSelector(getUpdatedCartItems);
  const sum = useAppSelector(getOrderSum);
  const isLoading = useAppSelector(getIsLoading);
  const err = useAppSelector(getError);

  if (err) return <Error500 />;

  if (isLoading) return <LoaderModal />;

  return (
    <ModalWrapper>
      <div className={css.modal}>
        <ConfettiComponent />
        <p className={css.resultText}>
          Дякуємо!
          <br />
          Ваше замовлення прийняте,
          <br />
          очікуйте дзвінок від менеджера
        </p>
        <p>Інформація про замовлення:</p>
        <ul>
          {updatedCartItems.map(
            ({ cart_id, title, quantity, price, options }) => {
              const itemPrice = calculateItemPrice({
                options,
                price,
                quantity,
              });
              return (
                <li key={cart_id}>
                  <p>
                    {title} - {quantity} шт. - {itemPrice} грн.
                  </p>
                  {options.map(item => {
                    return <p key={item._id}>{item.title}</p>;
                  })}
                </li>
              );
            }
          )}
        </ul>
        <p>Загальна сума: {sum} грн.</p>
        <Link href={'/'}>
          <Button type="button" onClick={finalAction}>
            Вийти
          </Button>
        </Link>
      </div>
    </ModalWrapper>
  );
}
