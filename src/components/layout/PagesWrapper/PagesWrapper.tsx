import { PropsWithChildren, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { checkCart } from '@/store/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getProducts } from '@/store/products/productsOperations';
import {
  getError,
  getIsLoading,
  getProductsAll,
} from '@/store/products/productsSlice';
import { pingServer } from '@/utils/pingServer';

import { Error500 } from '@/components/Error500';
import { Container } from '@/components/shared/Container';
import { LoaderModal } from '@/components/shared/LoaderModal';
import { Section } from '@/components/shared/Section';

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
