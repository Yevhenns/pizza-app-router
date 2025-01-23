import { Button } from '@/components/shared/Button';
import { Icon } from '@/components/shared/Icon';

import css from './ProductFooter.module.scss';

type ProductFooterProps = {
  addToCart: () => void;
  promotion: boolean;
  totalPrice: number;
  totalPromPrice: number;
};

export function ProductFooter({
  promotion,
  totalPrice,
  totalPromPrice,
  addToCart,
}: ProductFooterProps) {
  return (
    <div className={css.productFooter}>
      {promotion ? (
        <div className={css.priceWrapper}>
          <p className={css.oldPrice}>{totalPrice} грн</p>
          <p className={css.promPrice}>{totalPromPrice} грн</p>
        </div>
      ) : (
        <p className={css.price}>{totalPrice} грн</p>
      )}
      <Button type="button" onClick={addToCart}>
        <Icon svg="basket" iconWidth={19} iconHeight={19} color="white" />В
        кошик
      </Button>
    </div>
  );
}
