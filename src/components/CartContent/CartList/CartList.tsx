import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import {
  addOrderSum,
  deleteAllItems,
  getFilteredCart,
} from '@/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { Button } from '@/components/basic/Button';

import css from './CartList.module.scss';
import { CartListItem } from './CartListItem';

type CartListProps = {};

export function CartList({}: CartListProps) {
  const [sum, setSum] = useState(0);

  const filteredCart = useAppSelector(getFilteredCart);

  const dispatch = useAppDispatch();

  const deleteAllProducts = () => {
    dispatch(deleteAllItems());
    toast.warn('Кошик очищено', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
    });
  };

  useEffect(() => {
    const totalSum = filteredCart.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    setSum(totalSum);
    dispatch(addOrderSum(sum));
  }, [dispatch, sum, filteredCart]);

  return (
    <div className={css.cartList}>
      {filteredCart.map(data => {
        return <CartListItem key={data._id} data={data} />;
      })}
      <p className={css.totalPayment}>До cплати: {sum} грн</p>
      <Button onClick={deleteAllProducts} type="button">
        Очистити кошик
      </Button>
    </div>
  );
}
