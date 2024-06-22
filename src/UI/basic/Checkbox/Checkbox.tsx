import { forwardRef, HTMLProps } from 'react';
import css from './Checkbox.module.scss';

interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  label?: string;
}

type Ref = HTMLInputElement;

export const Checkbox = forwardRef<Ref, CheckboxProps>(
  ({ label, ...props }, ref) => {
    return (
      <fieldset className={css.fieldset}>
        <input type="checkbox" ref={ref} {...props} />
        <label htmlFor={props.htmlFor}>{label}</label>
      </fieldset>
    );
  }
);

Checkbox.displayName = 'Checkbox';
