import { Button } from '@/components/shared/Button/Button';
import { Icon } from '@/components/shared/Icon/Icon';

import css from './ProductFooter.module.scss';

type ProductFooterProps = {
  addToCart: () => void;
  promotion: boolean;
  totalPrice: number | null;
  totalPromPrice: number | null;
  preview: boolean;
};

export function ProductFooter({
  promotion,
  totalPrice,
  totalPromPrice,
  addToCart,
  preview,
}: ProductFooterProps) {
  const addItemToCart = () => {
    if (preview) return;
    addToCart();
  };

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
      <Button type="button" onClick={addItemToCart}>
        <Icon svg="basket" iconWidth={19} iconHeight={19} color="white" />В
        кошик
      </Button>
    </div>
  );
}
