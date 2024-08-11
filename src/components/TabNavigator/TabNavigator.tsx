'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/helpers/combineClasses';
import { useGetCartAndFavoriteLength } from '@/hooks/useGetCartAndFavoriteLength';

import { Icon } from '@/components/basic/Icon';

import css from './TabNavigator.module.scss';

export function TabNavigator() {
  const pathname = usePathname();

  const { cartLength, favoriteLength } = useGetCartAndFavoriteLength();

  return (
    <nav className={css.wrapper}>
      <Link className={cn(css.link, pathname === '/' && css.active)} href={'/'}>
        <Icon svg="home" iconWidth={34} iconHeight={34} />
      </Link>
      <Link
        className={cn(css.link, pathname === '/cart' && css.active)}
        href={'/cart'}
      >
        <Icon svg="basket" iconWidth={34} iconHeight={34} />
        {cartLength !== 0 && <span>{cartLength}</span>}
      </Link>
      <Link
        className={cn(css.link, pathname === '/favorite' && css.active)}
        href={'/favorite'}
      >
        <Icon svg="heart" iconWidth={34} iconHeight={34} />
        {favoriteLength !== 0 && <span>{favoriteLength}</span>}
      </Link>
    </nav>
  );
}
