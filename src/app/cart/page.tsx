'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';

import { deleteAllItems } from '@/redux/cart/cartSlice';
import { useAppDispatch } from '@/redux/hooks';

import { CartContent } from '@/components/CartContent';
import { FinalModal } from '@/components/FinalModal';

import css from './page.module.scss';

export default function Cart() {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();

  const openModal = () => {
    setOpen(true);
  };

  const deleteAllProducts = () => {
    dispatch(deleteAllItems());
    setOpen(false);
    toast.warn('Кошик очищено', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: true,
    });
  };

  return (
    <div className={css.cartWrapper}>
      <CartContent
        deleteAllProducts={deleteAllProducts}
        openModal={openModal}
      />
      {open && <FinalModal finalAction={deleteAllProducts} />}
    </div>
  );
}
