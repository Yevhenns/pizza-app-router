import { Empty } from '@/components/Empty';
import { CartForm } from './CartForm';
import { CartList } from './CartList';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteItem, getFilledCart } from '@/redux/cart/cartSlice';

interface CartContentProps {
  deleteAllProducts: () => void;
  openModal: () => void;
}

export function CartContent({
  deleteAllProducts,
  openModal,
}: CartContentProps) {
  const filledCart = useAppSelector(getFilledCart);

  const dispatch = useAppDispatch();

  const order: TOrdered = filledCart.map(item => {
    return {
      title: item.title,
      quantity: item.quantity,
    };
  });

  const deleteCartItem = (id: string) => {
    dispatch(deleteItem(id));
  };

  return (
    <>
      {filledCart.length > 0 ? (
        <>
          <CartList
            filledCart={filledCart}
            deleteCartItem={deleteCartItem}
            deleteAllProducts={deleteAllProducts}
          />
          <CartForm openModal={openModal} order={order} />
        </>
      ) : (
        <Empty text={'Кошик порожній!'} />
      )}
    </>
  );
}
