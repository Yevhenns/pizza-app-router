import { HTMLProps, PropsWithChildren } from 'react';
import css from './Heading.module.scss';

interface HeadingProps
  extends HTMLProps<PropsWithChildren<HTMLHeadingElement>> {}

export function Heading({ children }: HeadingProps) {
  return <h1 className={css.heading}>{children}</h1>;
}
