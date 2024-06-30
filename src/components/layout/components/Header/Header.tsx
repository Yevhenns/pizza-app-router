'use client';
import { getFilteredCart } from '@/redux/cart/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import { Container } from '@/UI/common/Container';
import { HeaderNavLink } from '../HeaderNavLink';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import { PhoneNumbersSet } from '../PhoneNumbersSet';
import { useEffect, useState } from 'react';
import { getFavorites } from '@/redux/products/productsSlice';
import css from './Header.module.scss';

export function Header() {
  const [cartLength, setCartLength] = useState<null | number>(null);
  const [favoriteLength, setFavoriteLength] = useState<null | number>(null);

  const cart = useAppSelector(getFilteredCart).length;
  const favorite = useAppSelector(getFavorites).length;

  useEffect(() => {
    cart > 0 && setCartLength(cart);
  }, [cart]);

  useEffect(() => {
    favorite > 0 && setFavoriteLength(favorite);
  }, [favorite]);

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
