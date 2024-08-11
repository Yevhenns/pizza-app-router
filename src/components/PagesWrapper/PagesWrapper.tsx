'use client';

import { PropsWithChildren, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { Container } from '@/UI/common/Container';
import { Section } from '@/UI/common/Section';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import { checkCart } from '@/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProductsAll } from '@/redux/products/productsSlice';

import { Error500 } from '@/components/Error500';

interface PagesWrapperProps extends PropsWithChildren {}

export function PagesWrapper({ children }: PagesWrapperProps) {
  const is500Error = useFetchProducts();

  const productsAll = useAppSelector(getProductsAll);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productsAll.length > 0) {
      dispatch(checkCart(productsAll));
    }
  }, [dispatch, productsAll]);

  return (
    <>
      <Section>
        <Container>{is500Error ? <Error500 /> : <>{children}</>}</Container>
      </Section>
    </>
  );
}
