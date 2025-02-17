import { useEffect } from 'react';

import { calculateItemPrice } from '@/helpers/calculateItemPrice';
import { addOrderSum, getUpdatedCartItems } from '@/store/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getIsLoading } from '@/store/products/productsSlice';

import { Empty } from '@/components/shared/Empty/Empty';
import { Loader } from '@/components/shared/Loader/Loader';

import css from './CartContent.module.scss';
import { CartForm } from './CartForm/CartForm';
import { CartList } from './CartList/CartList';

type CartContentProps = {
  openModal: () => void;
};

export function CartContent({ openModal }: CartContentProps) {
  const isLoading = useAppSelector(getIsLoading);

  const updatedCartItems = useAppSelector(getUpdatedCartItems);

  const dispatch = useAppDispatch();

  const order = updatedCartItems.map(({ title, quantity, options }) => {
    return {
      title,
      quantity,
      optionsTitles: options.map(item => item.title),
    };
  });

  useEffect(() => {
    const totalSum = updatedCartItems.reduce(
      (acc, { options, price, quantity }) =>
        acc + calculateItemPrice({ options, price, quantity }),
      0
    );
    dispatch(addOrderSum(totalSum));
  }, [updatedCartItems, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (updatedCartItems.length === 0 && !isLoading) {
    return <Empty text={'Кошик порожній!'} />;
  }

  return (
    <div className={css.layout}>
      <CartList updatedCartItems={updatedCartItems} />
      <CartForm openModal={openModal} order={order} />
    </div>
  );
}
