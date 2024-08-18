'use client';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProducts } from '@/redux/products/productsOperations';
import { getError, getProductsAll } from '@/redux/products/productsSlice';

export const useFetchProducts = () => {
  const products = useAppSelector(getProductsAll);
  const error = useAppSelector(getError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products.length === 0 && !error) {
      dispatch(getProducts());
      return;
    }
    if (error) {
      return error;
    }
  }, [dispatch, error, products.length]);

  return error;
};
