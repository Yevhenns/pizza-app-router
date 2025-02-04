'use client';

import { useEffect, useState } from 'react';

import {
  addCartItem,
  deleteAllItems,
  getFilteredCart,
} from '@/store/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { CartContent } from '@/components/Cart/CartContent';
import { FinalModal } from '@/components/Cart/FinalModal';

import css from './Cart.module.scss';

type CartProps = {
  products: Product[];
  supplements: Supplement[];
};

export default function Cart({ products, supplements }: CartProps) {
  const [open, setOpen] = useState(false);

  const filteredCart = useAppSelector(getFilteredCart);

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
    }) as CartItem2[];

    dispatch(addCartItem(cartProducts));
  }, [dispatch, filteredCart, products, supplements]);

  return (
    <div className={css.cartWrapper}>
      <CartContent openModal={openModal} />
      {open && <FinalModal finalAction={deleteAllProducts} />}
    </div>
  );
}
