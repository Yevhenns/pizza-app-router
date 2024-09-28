import { useEffect, useState } from 'react';

import { addOrderSum, getFilteredCart } from '@/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

import { Button } from '@/components/basic/Button';

import css from './CartList.module.scss';
import { CartListItem } from './CartListItem';

type CartListProps = {
  deleteCartItem: (cart_id: string) => void;
  deleteAllProducts: () => void;
};

export function CartList({ deleteCartItem, deleteAllProducts }: CartListProps) {
  const [sum, setSum] = useState(0);

  const filteredCart = useAppSelector(getFilteredCart);

  const dispatch = useAppDispatch();

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
