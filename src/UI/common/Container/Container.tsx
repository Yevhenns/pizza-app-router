import { HTMLProps, PropsWithChildren } from 'react';
import css from './Container.module.scss';

interface ContainerProps extends HTMLProps<PropsWithChildren<HTMLDivElement>> {}

export function Container({ children }: ContainerProps) {
  return <div className={css.container}>{children}</div>;
}
