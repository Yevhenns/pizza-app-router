import Link from 'next/link';

import { Icon } from '@/components/basic/Icon';

import css from './Logo.module.scss';

export function Logo() {
  return (
    <Link href={'/'} className={css.logo}>
      <Icon svg="logo" iconWidth={274} iconHeight={95} />
    </Link>
  );
}
