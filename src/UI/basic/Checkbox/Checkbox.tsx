import React, { FC, forwardRef, HTMLProps, PropsWithRef } from 'react';
import css from './Checkbox.module.scss';

interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  label?: string;
}

export const Checkbox: FC<PropsWithRef<CheckboxProps>> = forwardRef(
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
