import css from './InputErrorContainer.module.scss';

type InputErrorContainerProps = {
  error?: string;
};

export function InputErrorContainer({ error }: InputErrorContainerProps) {
  return (
    <div className={css.wrapper}>
      {error && <span className={css.text}>{error}</span>}
    </div>
  );
}
