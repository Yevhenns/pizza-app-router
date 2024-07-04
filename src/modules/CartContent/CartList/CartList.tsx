import { useEffect } from 'react';
import { CartListItem } from './CartListItem';
import { Button } from '@/UI/basic/Button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addOrderSum, getFilteredCart } from '@/redux/cart/cartSlice';
import css from './CartList.module.scss';

interface CartListProps {
  deleteCartItem: (_id: string) => void;
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
