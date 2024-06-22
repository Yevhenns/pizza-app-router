import { HTMLProps, PropsWithChildren } from 'react';
import css from './Section.module.scss';

interface SectionProps extends HTMLProps<PropsWithChildren<HTMLElement>> {}

export function Section({ children }: SectionProps) {
  return <section className={css.section}>{children}</section>;
}
