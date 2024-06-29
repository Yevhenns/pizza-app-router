import { Empty } from '@/components/Empty';
import { CartForm } from './CartForm';
import { CartList } from './CartList';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { deleteItem, getFilledCart } from '@/redux/cart/cartSlice';
import { getProductsAll } from '@/redux/products/productsSlice';

interface CartContentProps {
  deleteAllProducts: () => void;
  openModal: () => void;
}

export function CartContent({
  deleteAllProducts,
  openModal,
}: CartContentProps) {
  const filledCart = useAppSelector(getFilledCart);
  const productsAll = useAppSelector(getProductsAll)

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

  const filteredCart =
    productsAll.filter(({ _id: id1 }) => filledCart.some(({ _id: id2 }) => id1 === id2)
    );
  console.log(filteredCart);

  console.log(process.env.NODE_ENV);

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
