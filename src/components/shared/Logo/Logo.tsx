import Link from 'next/link';

import { Icon } from '../Icon/Icon';
import css from './Logo.module.scss';

type LogoProps = {
  isLight?: boolean;
};

export function Logo({ isLight = false }: LogoProps) {
  return (
    <Link href={'/'} className={css.logo} aria-label="logo home page">
      <Icon
        svg={isLight ? 'logo-light' : 'logo-dark'}
        iconWidth={75}
        iconHeight={64}
        color="white"
      />
    </Link>
  );
}
