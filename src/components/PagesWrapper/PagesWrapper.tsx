'use client';
import { PropsWithChildren } from 'react';
import Error500 from '@/components/errors/Error500/Error500';
import { useFetchProducts } from '@/hooks/useFetchProducts';
import { Section } from '@/UI/common/Section';
import { Container } from '@/UI/common/Container';
import 'react-toastify/dist/ReactToastify.css';

interface PagesWrapperProps extends PropsWithChildren {
  title: string;
}

export function PagesWrapper({ children }: PagesWrapperProps) {
  const is500Error = useFetchProducts();

  (async function () {
    fetch(`${process.env.SERVER_URL}/api/healthcheck`);
  })();

  return (
    <>
      <Section>
        <Container>{is500Error ? <Error500 /> : <>{children}</>}</Container>
      </Section>
    </>
  );
}
