import Link from 'next/link';

import { Icon } from '../shared/Icon';
import css from './Logo.module.scss';

export function Logo() {
  return (
    <Link href={'/'} className={css.logo} aria-label="logo home page">
      <Icon svg="logo" iconWidth={274} iconHeight={95} />
    </Link>
  );
}
