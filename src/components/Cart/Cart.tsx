'use client';

import { useEffect, useState } from 'react';

import {
  addCartItem,
  deleteAllItems,
  getCartItems,
} from '@/store/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import css from './Cart.module.scss';
import { CartContent } from './CartContent/CartContent';
import { FinalModal } from './FinalModal/FinalModal';

type CartProps = {
  products: Product[];
  supplements: Supplement[];
};

export function Cart({ products, supplements }: CartProps) {
  const [open, setOpen] = useState(false);

  const filteredCart = useAppSelector(getCartItems);

  const dispatch = useAppDispatch();

  const openModal = () => {
    setOpen(true);
  };

  const deleteAllProducts = () => {
    dispatch(deleteAllItems());
    setOpen(false);
  };

  useEffect(() => {
    const cartProducts = products.flatMap(product => {
      const cartItems = filteredCart.filter(item => item._id === product._id);

      if (cartItems.length > 0) {
        return cartItems.map(({ cart_id, optionsId, quantity }) => ({
          _id: product._id,
          title: product.title,
          price: product.promotion ? product.promPrice : product.price,
          photo: product.photo,
          cart_id,
          quantity,
          options: supplements.filter(supplement =>
            optionsId.includes(supplement._id)
          ),
        }));
      }

      return [];
    }) as UpdatedCartItem[];

    dispatch(addCartItem(cartProducts));
  }, [dispatch, filteredCart, products, supplements]);

  return (
    <div className={css.cartWrapper}>
      <CartContent openModal={openModal} />
      {open && <FinalModal finalAction={deleteAllProducts} />}
    </div>
  );
}
