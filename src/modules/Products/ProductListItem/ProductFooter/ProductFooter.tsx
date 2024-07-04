'use client';
import { Button } from '@/UI/basic/Button';
import { Icon } from '@/UI/basic/Icon';
import css from './ProductFooter.module.scss';

interface ProductFooterProps extends TProductItem {
  addToCart: TAddToCart;
  isInCart: (_id: string) => boolean;
  optionsArray: string[];
}

export function ProductFooter({
  _id,
  totalQuantity,
  promotion,
  totalPrice,
  totalPromPrice,
  addToCart,
  isInCart,
  optionsArray,
}: ProductFooterProps) {
  const isInCartBoolean = isInCart(_id);

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
        disabled={isInCartBoolean}
        type="button"
        onClick={() =>
          addToCart(
            _id,
            totalQuantity,
            promotion,
            totalPrice,
            totalPromPrice,
            optionsArray
          )
        }
      >
        {isInCartBoolean ? (
          <>
            <Icon svg="basket" iconWidth={16} iconHeight={16} color="white" />В
            кошику
          </>
        ) : (
          <>В кошик</>
        )}
      </Button>
    </div>
  );
}
