'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/helpers/combineClasses';
import { Icon } from '@/UI/basic/Icon';
import css from './TabNavigator.module.scss';

export function TabNavigator() {
  const pathname = usePathname();

  return (
    <nav className={css.wrapper}>
      <Link
        className={cn(css.link, pathname === '/' ? css.active : '')}
        href={'/'}
      >
        <Icon svg="home" iconWidth={34} iconHeight={34} />
      </Link>
      <Link
        className={cn(css.link, pathname === '/cart' ? css.active : '')}
        href={'/cart'}
      >
        <Icon svg="basket" iconWidth={34} iconHeight={34} />
      </Link>
      <Link
        className={cn(
          css.link,
          pathname === '/underDevelopment' ? css.active : ''
        )}
        href={'/underDevelopment'}
      >
        <Icon svg="user" iconWidth={34} iconHeight={34} />
      </Link>
      <Link
        className={cn(css.link, pathname === '/favorite' ? css.active : '')}
        href={'/favorite'}
      >
        <Icon svg="heart" iconWidth={34} iconHeight={34} />
      </Link>
    </nav>
  );
}
