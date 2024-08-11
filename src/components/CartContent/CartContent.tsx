import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteItem, getFilteredCart } from '@/redux/cart/cartSlice';
import { Empty } from '@/components/Empty';
import { CartForm } from './CartForm';
import { CartList } from './CartList';
import { Loader } from '@/UI/common/Loader';
import { getIsLoading } from '@/redux/products/productsSlice';
import css from './CartContent.module.scss';

interface CartContentProps {
  deleteAllProducts: () => void;
  openModal: () => void;
}

export function CartContent({
  deleteAllProducts,
  openModal,
}: CartContentProps) {
  const filteredCart = useAppSelector(getFilteredCart);
  const isLoading = useAppSelector(getIsLoading);

  const dispatch = useAppDispatch();

  const order: Ordered = filteredCart.map(item => {
    return {
      title: item.title,
      quantity: item.quantity,
      options: item.options,
    };
  });

  const deleteCartItem = (cart_id: string) => {
    dispatch(deleteItem(cart_id));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (filteredCart.length === 0 && !isLoading) {
    return <Empty text={'Кошик порожній!'} />;
  }

  return (
    <div className={css.layout}>
      <CartList
        deleteCartItem={deleteCartItem}
        deleteAllProducts={deleteAllProducts}
      />
      <CartForm openModal={openModal} order={order} />
    </div>
  );
}
