import { HTMLProps, PropsWithChildren } from 'react';

import css from './RoundButton.module.scss';

type RoundButtonProps = {
  type?: 'button';
} & HTMLProps<PropsWithChildren<HTMLButtonElement>>;

export function RoundButton({
  children,
  type = 'button',
  ...props
}: RoundButtonProps) {
  return (
    <button className={css.button} type={type} {...props}>
      {children}
    </button>
  );
}
