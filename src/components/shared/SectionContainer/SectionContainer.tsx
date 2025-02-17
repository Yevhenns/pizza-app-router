import { HTMLProps, PropsWithChildren } from 'react';

import { Container } from '../Container/Container';
import { Section } from '../Section/Section';

type SectionContainerProps = {} & HTMLProps<PropsWithChildren<HTMLDivElement>>;

export function SectionContainer({ children }: SectionContainerProps) {
  return (
    <Section>
      <Container>{children}</Container>
    </Section>
  );
}
