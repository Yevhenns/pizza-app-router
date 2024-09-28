import { HTMLProps, PropsWithChildren } from 'react';

import css from './Button.module.scss';

type ButtonProps = {
  type?: 'submit' | 'button';
} & HTMLProps<PropsWithChildren<HTMLButtonElement>>;

export function Button({ children, type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type} className={css.button} {...props}>
      {children}
    </button>
  );
}
