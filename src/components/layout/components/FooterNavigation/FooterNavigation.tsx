import Link from 'next/link';
import css from './FooterNavigation.module.scss';
import { PhoneNumbersSet } from '../PhoneNumbersSet';

export function FooterNavigation() {
  return (
    <div className={css.wrapper}>
      <div className={css.item}>
        <Link href="/underDevelopment">Про нас</Link>
        <p>Працюємо з 10:00 до 22:00</p>
      </div>
      <div className={css.item}>
        <Link href="/underDevelopment">Оплата онлайн</Link>
        <Link href="/underDevelopment">Власна доставка</Link>
      </div>
      <div className={css.item}>
        <Link href="/underDevelopment">Конфіденційність</Link>
        <Link href="/underDevelopment">Оферта</Link>
      </div>
      <PhoneNumbersSet />
    </div>
  );
}
