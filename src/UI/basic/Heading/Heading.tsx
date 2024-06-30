import { HTMLProps, PropsWithChildren } from 'react';
import css from './Heading.module.scss';
import { cn } from '@/helpers/combineClasses';

interface HeadingProps
  extends HTMLProps<PropsWithChildren<HTMLHeadingElement>> {
  visible?: boolean;
}

export function Heading({ visible = false, children }: HeadingProps) {
  return (
    <h1 className={cn(visible ? css.heading : css.headingHidden)}>
      {children}
    </h1>
  );
}
