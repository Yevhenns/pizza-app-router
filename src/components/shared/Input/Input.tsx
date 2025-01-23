import { HTMLProps, forwardRef } from 'react';

import css from './Input.module.scss';

type InputProps = {
  label?: string;
  error?: string;
} & HTMLProps<HTMLInputElement>;

type Ref = HTMLInputElement;

export const Input = forwardRef<Ref, InputProps>(function Input(
  { label, error, ...props },
  ref
) {
  return (
    <fieldset className={css.fieldset}>
      <label htmlFor={props.htmlFor}>{label}</label>
      <input autoComplete="true" ref={ref} {...props} />
      <div>{error && <span>{error}</span>}</div>
    </fieldset>
  );
});

Input.displayName = 'Input';
