'use client';
import { PropsWithChildren, useEffect } from 'react';
import { Error500 } from '@/components/Error500';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import { Section } from '@/UI/common/Section';
import { Container } from '@/UI/common/Container';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProductsAll } from '@/redux/products/productsSlice';
import { checkCart } from '@/redux/cart/cartSlice';
import 'react-toastify/dist/ReactToastify.css';

interface PagesWrapperProps extends PropsWithChildren {}

export function PagesWrapper({ children }: PagesWrapperProps) {
  const is500Error = useFetchProducts();

  const productsAll = useAppSelector(getProductsAll);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkCart(productsAll));
  }, [dispatch, productsAll]);

  return (
    <>
      <Section>
        <Container>{is500Error ? <Error500 /> : <>{children}</>}</Container>
      </Section>
    </>
  );
}
