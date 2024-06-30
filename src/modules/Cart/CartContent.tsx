import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteItem, getFilteredCart } from '@/redux/cart/cartSlice';
import { Empty } from '@/components/Empty';
import { CartForm } from './CartForm';
import { CartList } from './CartList';

interface CartContentProps {
  deleteAllProducts: () => void;
  openModal: () => void;
}

export function CartContent({
  deleteAllProducts,
  openModal,
}: CartContentProps) {
  const filteredCart = useAppSelector(getFilteredCart);

  const dispatch = useAppDispatch();

  const order: TOrdered = filteredCart.map(item => {
    return {
      title: item.title,
      quantity: item.quantity,
    };
  });

  const deleteCartItem = (id: string) => {
    dispatch(deleteItem(id));
  };

  if (filteredCart.length === 0) {
    return <Empty text={'Кошик порожній!'} />;
  }

  return (
    <>
      <CartList
        deleteCartItem={deleteCartItem}
        deleteAllProducts={deleteAllProducts}
      />
      <CartForm openModal={openModal} order={order} />
    </>
  );
}
