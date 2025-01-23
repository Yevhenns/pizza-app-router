import { HTMLProps, PropsWithChildren } from 'react';

import css from './Section.module.scss';

type SectionProps = {} & HTMLProps<PropsWithChildren<HTMLDivElement>>;

export function Section({ children }: SectionProps) {
  return <section className={css.section}>{children}</section>;
}
