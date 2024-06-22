import Image from 'next/image';
import css from './Empty.module.scss';

interface EmptyProps {
  text: string;
}

export function Empty({ text }: EmptyProps) {
  return (
    <div className={css.emptyCart}>
      <Image
        src={'/empty.png'}
        alt="empty"
        width={236}
        height={257}
        priority={true}
      />
      <p>{text}</p>
    </div>
  );
}
