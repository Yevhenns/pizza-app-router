/* eslint-disable react/no-unescaped-entities */
import {
  getError,
  getFilteredCart,
  getIsLoading,
  getOrderSum,
} from '@/redux/cart/cartSlice';
import { useAppSelector } from '@/redux/hooks';

import { Button } from '@/components/basic/Button';
import { LoaderModal } from '@/components/common/LoaderModal';

import { Error500 } from '../Error500/Error500';
import css from './FinalModal.module.scss';

type FinalModalProps = {
  finalAction: () => void;
};

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
                ({ _id, title, quantity, totalPrice, optionsTitles }) => {
                  return (
                    <li key={_id}>
                      <p>
                        {title} - {quantity} шт. - {totalPrice} грн.
                      </p>
                      {optionsTitles.map(item => {
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
