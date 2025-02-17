import { toast } from 'react-toastify';

import Image from 'next/image';

import { calculateItemPrice } from '@/helpers/calculateItemPrice';
import { deleteItem, getCartItems } from '@/store/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { Icon } from '@/components/shared/Icon/Icon';
import { RoundButton } from '@/components/shared/RoundButton/RoundButton';

import css from './CartListItem.module.scss';
import { CartListItemQuantity } from './CartListItemQuantity/CartListItemQuantity';

type CartListItemProps = {
  data: UpdatedCartItem;
};

export function CartListItem({ data }: CartListItemProps) {
  const { cart_id, photo, title, price, options } = data;

  const filteredCart = useAppSelector(getCartItems);
  const quantity =
    filteredCart.find(item => item.cart_id === cart_id)?.quantity || 0;

  const dispatch = useAppDispatch();

  const deleteCartItem = () => {
    dispatch(deleteItem(cart_id));
    toast.warn('Видалено з кошика', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
      closeButton: false,
    });
  };

  const itemPrice = calculateItemPrice({ options, price, quantity });

  return (
    <div className={css.wrapper}>
      <div className={css.cartListItem}>
        <Image
          src={photo}
          alt="item photo"
          width={50}
          height={50}
          priority={true}
        />
        <p>{title}</p>
        <CartListItemQuantity chosenQuantity={quantity} cart_id={cart_id} />
        <p>{itemPrice} грн</p>
        <RoundButton onClick={deleteCartItem}>
          <Icon svg="remove" iconWidth={24} iconHeight={24} color="accent" />
        </RoundButton>
      </div>
      {options.length > 0 && (
        <div>
          <span>Додаткові опції:</span>
          <ul>
            {options.map(item => {
              return <li key={item._id}>{item.title}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
