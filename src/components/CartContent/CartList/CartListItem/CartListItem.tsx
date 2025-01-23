import { toast } from 'react-toastify';

import Image from 'next/image';

import { deleteItem } from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';

import { Icon } from '@/components/basic/Icon';
import { RoundButton } from '@/components/basic/RoundButton';

import css from './CartListItem.module.scss';
import { CartListItemQuantity } from './CartListItemQuantity';

type CartListItemProps = {
  data: CartItem;
};

export function CartListItem({ data }: CartListItemProps) {
  const { cart_id, photo, title, quantity, totalPrice, optionsTitles } = data;

  const dispatch = useAppDispatch();

  const deleteCartItem = () => {
    dispatch(deleteItem(cart_id));
    toast.warn('Видалено з кошика', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
    });
  };

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
        <CartListItemQuantity
          chosenQuantity={quantity}
          cart_id={cart_id}
          price={totalPrice}
        />
        <p>{totalPrice} грн</p>
        <RoundButton onClick={deleteCartItem}>
          <Icon svg="remove" iconWidth={24} iconHeight={24} color="accent" />
        </RoundButton>
      </div>
      {optionsTitles.length > 0 && (
        <div>
          <span>Додаткові опції:</span>
          <ul>
            {optionsTitles.map(item => {
              return <li key={item}>{item}</li>;
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
