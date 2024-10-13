import { getFilteredCart } from '@/redux/cart/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import { getIsLoading } from '@/redux/products/productsSlice';

import { Empty } from '@/components/Empty';
import { Loader } from '@/components/common/Loader';

import css from './CartContent.module.scss';
import { CartForm } from './CartForm';
import { CartList } from './CartList';

type CartContentProps = {
  openModal: () => void;
};

export function CartContent({ openModal }: CartContentProps) {
  const filteredCart = useAppSelector(getFilteredCart);
  const isLoading = useAppSelector(getIsLoading);

  const order = filteredCart.map(({ title, quantity, optionsTitles }) => {
    return {
      title,
      quantity,
      optionsTitles,
    };
  });

  if (isLoading) {
    return <Loader />;
  }

  if (filteredCart.length === 0 && !isLoading) {
    return <Empty text={'Кошик порожній!'} />;
  }

  return (
    <div className={css.layout}>
      <CartList />
      <CartForm openModal={openModal} order={order} />
    </div>
  );
}
