'use client';

import { PropsWithChildren, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  getAllProducts,
  getError,
  getIsLoading,
} from '@/store/products/productsSlice';
import { pingServer } from '@/utils/pingServer';

import { Error500 } from '@/components/Error500';
import { Container } from '@/components/shared/Container';
import { LoaderModal } from '@/components/shared/LoaderModal';
import { Section } from '@/components/shared/Section';

type PagesWrapperProps = PropsWithChildren;

export function PagesWrapper({ children }: PagesWrapperProps) {
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector(getIsLoading);
  const error = useAppSelector(getError);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

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
