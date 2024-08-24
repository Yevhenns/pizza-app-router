import { PropsWithChildren, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { checkCart } from '@/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getError, getIsLoading, getProductsAll } from '@/redux/products/productsSlice';

import { Error500 } from '@/components/Error500';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';

import { LoaderModal } from '../common/LoaderModal';
import { getProducts } from '@/redux/products/productsOperations';

type PagesWrapperProps = PropsWithChildren;

export function PagesWrapper({ children }: PagesWrapperProps) {
  const productsAll = useAppSelector(getProductsAll);
  const isLoading = useAppSelector(getIsLoading);
  const error = useAppSelector(getError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (productsAll.length === 0 && !error) {
      dispatch(getProducts());
      return;
    }
    if (productsAll.length > 0) {
      dispatch(checkCart(productsAll));
    }
  }, [dispatch, error, productsAll]);

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
