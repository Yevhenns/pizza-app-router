import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/helpers/combineClasses';
import { getUserInfo } from '@/redux/auth/authSlice';
import { getFilteredCart } from '@/redux/cart/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import { getFavorites } from '@/redux/products/productsSlice';

import { Icon } from '@/components/basic/Icon';
import { Container } from '@/components/common/Container';

import { Avatar } from '../Avatar';
import { Logo } from '../Logo';
import { PhoneNumbersSet } from '../PhoneNumbersSet';
import css from './Header.module.scss';
import { Navigation } from './Navigation';

export function Header() {
  const pathname = usePathname();

  const cartLength = useAppSelector(getFilteredCart).length;
  const favoriteLength = useAppSelector(getFavorites).length;
  const userInfo = useAppSelector(getUserInfo);

  const ADMIN_ID = process.env.ADMIN_ID;

  const isUserAdmin = () => {
    return userInfo?.sub === ADMIN_ID;
  };

  return (
    <header className={css.wrapper}>
      <Container>
        <div className={css.headerItem}>
          <Logo />
          <div className={css.headerLinks}>
            <div className={css.phoneNumberSet}>
              <PhoneNumbersSet />
            </div>
            <Link
              className={cn(
                css.navLink,
                pathname === '/login' ? css.active : ''
              )}
              href={'/login'}
              aria-label="login page"
            >
              {userInfo !== null ? (
                <Avatar />
              ) : (
                <Icon svg="user" iconWidth={34} iconHeight={34} />
              )}
            </Link>
            <Link
              className={cn(
                css.navLink,
                pathname === '/favorite' ? css.active : ''
              )}
              href={'/favorite'}
              aria-label="favorite page"
            >
              <Icon svg="heart" iconWidth={34} iconHeight={34} />
              {favoriteLength !== 0 && <span>{favoriteLength}</span>}
            </Link>
            <Link
              className={cn(
                css.navLink,
                pathname === '/cart' ? css.active : ''
              )}
              href={'/cart'}
              aria-label="cart page"
            >
              <Icon svg="basket" iconWidth={34} iconHeight={34} />
              {cartLength !== 0 && <span>{cartLength}</span>}
            </Link>
            {isUserAdmin() && (
              <Link
                className={cn(
                  css.navLink,
                  pathname === '/admin' ? css.active : ''
                )}
                href={'/admin'}
                aria-label="admin page"
              >
                <Icon svg="user" iconWidth={34} iconHeight={34} />
              </Link>
            )}
          </div>
        </div>
      </Container>
      <Navigation />
    </header>
  );
}
