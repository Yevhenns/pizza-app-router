import Image from 'next/image';

import { Icon } from '@/components/basic/Icon';
import { RoundButton } from '@/components/basic/RoundButton';

import css from './CartListItem.module.scss';
import { CartListItemQuantity } from './CartListItemQuantity';

type CartListItemProps = {
  data: CartItem;
  deleteCartItem: (cart_id: string) => void;
};

export function CartListItem({ data, deleteCartItem }: CartListItemProps) {
  const { cart_id, photo, title, quantity, totalPrice, optionsTitles } = data;

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
        <RoundButton onClick={() => deleteCartItem(cart_id!)}>
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
