import { PropsWithChildren, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { checkCart } from '@/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getProducts } from '@/redux/products/productsOperations';
import {
  getError,
  getIsLoading,
  getProductsAll,
} from '@/redux/products/productsSlice';
import { pingServer } from '@/utils/pingServer';

import { Error500 } from '@/components/Error500';
import { Container } from '@/components/shared/Container';
import { Section } from '@/components/shared/Section';

import { LoaderModal } from '../shared/LoaderModal';

type PagesWrapperProps = PropsWithChildren;

export function PagesWrapper({ children }: PagesWrapperProps) {
  const productsAll = useAppSelector(getProductsAll);
  const isLoading = useAppSelector(getIsLoading);
  const error = useAppSelector(getError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (productsAll.length > 0) {
      dispatch(checkCart(productsAll));
    }
  }, [dispatch, productsAll]);

  useEffect(() => {
    pingServer();
  }, []);

  return (
    <Section>
      <Container>
        {error ? (
          <Error500 />
        ) : (
          <>
            {isLoading && <LoaderModal />}
            {children}
          </>
        )}
      </Container>
    </Section>
  );
}
