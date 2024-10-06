'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/helpers/combineClasses';
import { getUserInfo } from '@/redux/auth/authSlice';
import { getFilteredCart } from '@/redux/cart/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import { getFavorites } from '@/redux/products/productsSlice';

import { Icon } from '@/components/basic/Icon';

import { Avatar } from '../Avatar';
import css from './TabNavigator.module.scss';

export function TabNavigator() {
  const pathname = usePathname();

  const cartLength = useAppSelector(getFilteredCart).length;
  const favoriteLength = useAppSelector(getFavorites).length;
  const userInfo = useAppSelector(getUserInfo);

  return (
    <nav className={css.wrapper}>
      <Link className={cn(css.link, pathname === '/' && css.active)} href={'/'}>
        <Icon svg="home" iconWidth={34} iconHeight={34} />
      </Link>
      <Link
        className={cn(css.link, pathname === '/login' && css.active)}
        href={'/login'}
      >
        {userInfo !== null ? (
          <Avatar />
        ) : (
          <Icon svg="user" iconWidth={34} iconHeight={34} />
        )}
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
