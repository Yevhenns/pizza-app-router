import { forwardRef, HTMLProps } from 'react';
import css from './TextArea.module.scss';

interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

type Ref = HTMLTextAreaElement;

export const TextArea = forwardRef<Ref, TextAreaProps>(function TextArea(
  { label, error, ...props },
  ref
) {
  return (
    <fieldset className={css.fieldset}>
      <label htmlFor={props.htmlFor}>{label}</label>
      <textarea rows={5} autoComplete="true" ref={ref} {...props} />
      {error && <span className={css.errorMessage}>{error}</span>}
    </fieldset>
  );
});

TextArea.displayName = 'TextArea';
