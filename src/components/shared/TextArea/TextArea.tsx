import { HTMLProps, forwardRef } from 'react';

import { InputErrorContainer } from '../InputErrorContainer/InputErrorContainer';
import css from './TextArea.module.scss';

type TextAreaProps = {
  label?: string;
  error?: string;
} & HTMLProps<HTMLTextAreaElement>;

type Ref = HTMLTextAreaElement;

export const TextArea = forwardRef<Ref, TextAreaProps>(function TextArea(
  { label, error, ...props },
  ref
) {
  return (
    <fieldset className={css.fieldset}>
      <label htmlFor={props.htmlFor}>{label}</label>
      <textarea rows={5} autoComplete="true" ref={ref} {...props} />
      <InputErrorContainer error={error} />
    </fieldset>
  );
});

TextArea.displayName = 'TextArea';
