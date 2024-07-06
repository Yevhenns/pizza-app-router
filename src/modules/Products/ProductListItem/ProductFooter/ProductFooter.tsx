'use client';
import { Button } from '@/UI/basic/Button';
import css from './ProductFooter.module.scss';

interface ProductFooterProps extends ProductItem {
  addToCart: AddToCart;
  optionsArray: Option[];
}

export function ProductFooter({
  _id,
  totalQuantity,
  promotion,
  totalPrice,
  totalPromPrice,
  addToCart,
  optionsArray,
}: ProductFooterProps) {
  const optionsTitles = optionsArray.map(item => item.title);

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
      <Button
        type="button"
        onClick={() =>
          addToCart(
            _id,
            totalQuantity,
            promotion,
            totalPrice,
            totalPromPrice,
            optionsTitles
          )
        }
      >
        В кошик
      </Button>
    </div>
  );
}
