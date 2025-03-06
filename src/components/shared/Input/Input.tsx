import { HTMLProps, forwardRef, useState } from 'react';

import { cn } from '@/helpers/combineClasses';

import { Icon } from '../Icon/Icon';
import { InputErrorContainer } from '../InputErrorContainer/InputErrorContainer';
import { RoundButton } from '../RoundButton/RoundButton';
import css from './Input.module.scss';

type InputProps = {
  label?: string;
  error?: string;
  forPassword?: boolean;
} & HTMLProps<HTMLInputElement>;

type Ref = HTMLInputElement;

export const Input = forwardRef<Ref, InputProps>(function Input(
  { label, error, forPassword, ...props },
  ref
) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <fieldset className={css.fieldset}>
      <label htmlFor={props.htmlFor}>{label}</label>
      <div className={css.inputWrapper}>
        <input
          className={cn(css.input, forPassword && css.password)}
          autoComplete="true"
          ref={ref}
          type={
            forPassword ? (passwordVisible ? 'text' : 'password') : props.type
          }
          {...props}
        />
        {forPassword && (
          <div className={css.iconWrapper}>
            <RoundButton onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? (
                <Icon svg={'eye'} iconWidth={24} iconHeight={24} color="main" />
              ) : (
                <Icon
                  svg={'eye-closed'}
                  iconWidth={24}
                  iconHeight={24}
                  color="main"
                />
              )}
            </RoundButton>
          </div>
        )}
      </div>
      <InputErrorContainer error={error} />
    </fieldset>
  );
});

Input.displayName = 'Input';
