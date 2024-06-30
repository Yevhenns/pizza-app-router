import Image from 'next/image';
import { RoundButton } from '@/UI/basic/RoundButton';
import { Icon } from '@/UI/basic/Icon';
import css from './CartListItem.module.scss';

interface CartListItemProps {
  data: TCartItem;
  deleteCartItem: (_id: string) => void;
}

export function CartListItem({ data, deleteCartItem }: CartListItemProps) {
  const { _id, photo, title, quantity, totalPrice } = data;

  return (
    <div className={css.cartListItem}>
      <Image
        src={photo}
        alt="item photo"
        width={50}
        height={50}
        priority={true}
      />
      <p>{title}</p>
      <p>{quantity}</p>
      <p>{totalPrice} грн</p>
      <RoundButton onClick={() => deleteCartItem(_id)}>
        <Icon svg="remove" iconWidth={24} iconHeight={24} color="accent" />
      </RoundButton>
    </div>
  );
}
