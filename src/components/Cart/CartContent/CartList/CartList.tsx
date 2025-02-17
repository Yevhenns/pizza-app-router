import { toast } from 'react-toastify';

import { deleteAllItems, getOrderSum } from '@/store/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { Button } from '@/components/shared/Button/Button';

import css from './CartList.module.scss';
import { CartListItem } from './CartListItem/CartListItem';

type CartListProps = {
  updatedCartItems: UpdatedCartItem[];
};

export function CartList({ updatedCartItems }: CartListProps) {
  const dispatch = useAppDispatch();

  const sum = useAppSelector(getOrderSum);

  const deleteAllProducts = () => {
    dispatch(deleteAllItems());
    toast.warn('Кошик очищено', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeButton: false,
    });
  };

  return (
    <div className={css.cartList}>
      {updatedCartItems.map(data => {
        return <CartListItem key={data.cart_id} data={data} />;
      })}
      <p className={css.totalPayment}>До cплати: {sum} грн</p>
      <Button onClick={deleteAllProducts} type="button">
        Очистити кошик
      </Button>
    </div>
  );
}
