import Link from 'next/link';

import { Icon } from '../Icon';
import css from './Logo.module.scss';

export function Logo() {
  return (
    <Link href={'/'} className={css.logo} aria-label="logo home page">
      <Icon svg="logo-dark" iconWidth={75} iconHeight={64} color="white" />
    </Link>
  );
}
