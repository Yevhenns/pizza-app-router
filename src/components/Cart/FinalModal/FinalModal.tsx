/* eslint-disable react/no-unescaped-entities */
import { createPortal } from 'react-dom';

import { calculateItemPrice } from '@/helpers/calculateItemPrice';
import {
  getCartItem,
  getError,
  getFilteredCart,
  getIsLoading,
  getOrderSum,
} from '@/store/cart/cartSlice';
import { useAppSelector } from '@/store/hooks';

import { Button } from '@/components/shared/Button';
import { LoaderModal } from '@/components/shared/LoaderModal';

import { Error500 } from '../../Error500/Error500';
import css from './FinalModal.module.scss';

type FinalModalProps = {
  finalAction: () => void;
};

export function FinalModal({ finalAction }: FinalModalProps) {
  const cartProducts = useAppSelector(getCartItem);
  const sum = useAppSelector(getOrderSum);
  const isLoading = useAppSelector(getIsLoading);
  const err = useAppSelector(getError);

  if (err) {
    return <Error500 />;
  }

  return createPortal(
    <div className={css.modalWrapper}>
      {isLoading ? (
        <LoaderModal />
      ) : (
        <div className={css.modal}>
          <>
            <p className={css.resultText}>
              Дякуємо!
              <br />
              Ваше замовлення прийняте,
              <br />
              очікуйте дзвінок від менеджера
            </p>
            <p>Інформація про замовлення:</p>
            <ul>
              {cartProducts.map(
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
            <Button type="button" onClick={finalAction}>
              Вийти
            </Button>
          </>
        </div>
      )}
    </div>,
    document.body
  );
}
