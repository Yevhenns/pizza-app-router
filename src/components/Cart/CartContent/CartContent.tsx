import { useEffect } from 'react';

import { calculateItemPrice } from '@/helpers/calculateItemPrice';
import {
  addOrderSum,
  getCartItem,
  getFilteredCart,
} from '@/store/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getIsLoading } from '@/store/products/productsSlice';

import { Empty } from '@/components/shared/Empty';
import { Loader } from '@/components/shared/Loader';

import css from './CartContent.module.scss';
import { CartForm } from './CartForm';
import { CartList } from './CartList';

type CartContentProps = {
  openModal: () => void;
};

export function CartContent({ openModal }: CartContentProps) {
  const isLoading = useAppSelector(getIsLoading);

  const cartProducts = useAppSelector(getCartItem);

  const dispatch = useAppDispatch();

  const order = cartProducts.map(({ title, quantity, options }) => {
    return {
      title,
      quantity,
      optionsTitles: options.map(item => item.title),
    };
  });

  useEffect(() => {
    const totalSum = cartProducts.reduce(
      (acc, { options, price, quantity }) =>
        acc + calculateItemPrice({ options, price, quantity }),
      0
    );
    dispatch(addOrderSum(totalSum));
  }, [cartProducts, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (cartProducts.length === 0 && !isLoading) {
    return <Empty text={'Кошик порожній!'} />;
  }

  return (
    <div className={css.layout}>
      <CartList cartProducts={cartProducts} />
      <CartForm openModal={openModal} order={order} />
    </div>
  );
}
