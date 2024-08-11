import { useEffect } from 'react';

import { Button } from '@/UI/basic/Button';
import { addOrderSum, getFilteredCart } from '@/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import css from './CartList.module.scss';
import { CartListItem } from './CartListItem';

interface CartListProps {
  deleteCartItem: (cart_id: string) => void;
  deleteAllProducts: () => void;
}

export function CartList({ deleteCartItem, deleteAllProducts }: CartListProps) {
  const filteredCart = useAppSelector(getFilteredCart);

  let sum = 0;
  filteredCart.forEach(item => (sum += item.totalPrice));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addOrderSum(sum));
  }, [dispatch, sum]);

  return (
    <div className={css.cartList}>
      {filteredCart.map(data => {
        return (
          <CartListItem
            key={data._id}
            deleteCartItem={deleteCartItem}
            data={data}
          />
        );
      })}
      <p className={css.totalPayment}>До cплати: {sum} грн</p>
      <Button onClick={deleteAllProducts} type="button">
        Очистити кошик
      </Button>
    </div>
  );
}
