/* eslint-disable react/no-unescaped-entities */
import { Button } from '@/UI/basic/Button';
import { LoaderModal } from '@/UI/common/LoaderModal';
import {
  getError,
  getFilteredCart,
  getIsLoading,
  getOrderSum,
} from '@/redux/cart/cartSlice';
import { useAppSelector } from '@/redux/hooks';

import { Error500 } from '../Error500/Error500';
import css from './FinalModal.module.scss';

interface FinalModalProps {
  finalAction: () => void;
}

export function FinalModal({ finalAction }: FinalModalProps) {
  const filteredCart = useAppSelector(getFilteredCart);
  const sum = useAppSelector(getOrderSum);
  const isLoading = useAppSelector(getIsLoading);
  const err = useAppSelector(getError);

  if (err) {
    return <Error500 />;
  }

  return (
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
              {filteredCart.map(
                ({ _id, title, quantity, totalPrice, options }) => {
                  return (
                    <li key={_id}>
                      <p>
                        {title} - {quantity} шт. - {totalPrice} грн.
                      </p>
                      {options.map(item => {
                        return <p key={item}>{item}</p>;
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
    </div>
  );
}
