import { ReactNode } from 'react';

import css from './RoundButton.module.scss';

interface RoundButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export function RoundButton({
  children,
  onClick,
  disabled,
  ...props
}: RoundButtonProps) {
  return (
    <button
      className={css.button}
      type="button"
      onClick={onClick}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
