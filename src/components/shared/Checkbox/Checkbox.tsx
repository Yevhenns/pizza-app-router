import { HTMLProps, forwardRef } from 'react';

import { cn } from '@/helpers/combineClasses';

import css from './Checkbox.module.scss';

type CheckboxProps = {
  label?: string;
  posRight?: boolean;
  type?: 'checkbox' | 'radio';
  checked?: boolean;
} & HTMLProps<HTMLInputElement>;

type Ref = HTMLInputElement;

export const Checkbox = forwardRef<Ref, CheckboxProps>(
  ({ label, posRight = false, checked, type = 'checkbox', ...props }, ref) => {
    return (
      <fieldset className={cn(css.fieldset, posRight && css.right)}>
        <input type={type} checked={checked} ref={ref} {...props} />
        <label htmlFor={props.htmlFor}>{label}</label>
      </fieldset>
    );
  }
);

Checkbox.displayName = 'Checkbox';
