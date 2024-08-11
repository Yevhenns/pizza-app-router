import { HTMLProps, PropsWithChildren } from 'react';

import css from './Button.module.scss';

interface ButtonProps extends HTMLProps<PropsWithChildren<HTMLButtonElement>> {
  type: 'submit' | 'button';
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  disabled = false,
  children,
  onClick,
  type,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className={css.button}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
