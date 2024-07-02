'use client';
import { Container } from '@/UI/common/Container';
import { HeaderNavLink } from '../HeaderNavLink';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import { PhoneNumbersSet } from '../PhoneNumbersSet';
import { useGetCartAndFavoriteLength } from '@/hooks/useGetCartAndFavoriteLength';
import css from './Header.module.scss';

export function Header() {
  const { cartLength, favoriteLength } = useGetCartAndFavoriteLength();

  return (
    <header className={css.wrapper}>
      <Container>
        <div className={css.headerItem}>
          <Logo />
          <div className={css.headerLinks}>
            <div className={css.phoneNumberSet}>
              <PhoneNumbersSet />
            </div>
            <HeaderNavLink
              hrefProp={'/favorite'}
              svg="heart"
              text={favoriteLength}
            />
            <HeaderNavLink hrefProp={'/cart'} svg="basket" text={cartLength} />
          </div>
        </div>
      </Container>
      <Navigation />
    </header>
  );
}
