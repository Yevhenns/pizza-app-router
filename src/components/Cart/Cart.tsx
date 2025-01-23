'use client';

import { useState } from 'react';

import { deleteAllItems } from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';

import { CartContent } from '@/components/CartContent';
import { FinalModal } from '@/components/FinalModal';

import css from './Cart.module.scss';

export default function Cart() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const openModal = () => {
    setOpen(true);
  };

  const deleteAllProducts = () => {
    dispatch(deleteAllItems());
    setOpen(false);
  };

  return (
    <div className={css.cartWrapper}>
      <CartContent openModal={openModal} />
      {open && <FinalModal finalAction={deleteAllProducts} />}
    </div>
  );
}
