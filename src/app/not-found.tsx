import { Metadata } from 'next';
import Link from 'next/link';

import css from './not-found.module.scss';

export const metadata: Metadata = {
  title: 'Nostra Pizza | 404',
};

export default function NotFound() {
  return (
    <div className={css.wrapper}>
      <h2>404 - Page Not Found</h2>
      <Link href={'/'}>На головну</Link>
    </div>
  );
}
