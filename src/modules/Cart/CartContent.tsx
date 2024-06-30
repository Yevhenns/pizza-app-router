import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteItem, getFilteredCart } from '@/redux/cart/cartSlice';
import { Empty } from '@/components/Empty';
import { CartForm } from './CartForm';
import { CartList } from './CartList';
import { Loader } from '@/UI/common/Loader';
import { getIsLoading } from '@/redux/products/productsSlice';

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

  const order: TOrdered = filteredCart.map(item => {
    return {
      title: item.title,
      quantity: item.quantity,
    };
  });
  console.log(isLoading);

  const deleteCartItem = (id: string) => {
    dispatch(deleteItem(id));
  };

  if (isLoading) {
    return <Loader />;
  }

  if (filteredCart.length === 0 && !isLoading) {
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
