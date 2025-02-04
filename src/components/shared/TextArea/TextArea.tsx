import { HTMLProps, forwardRef } from 'react';

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
      <div>{error && <span>{error}</span>}</div>
    </fieldset>
  );
});

TextArea.displayName = 'TextArea';
