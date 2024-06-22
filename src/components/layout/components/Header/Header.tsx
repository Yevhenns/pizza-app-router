'use client';

import React, { useEffect, useState } from 'react';
import { getFilledCart } from '@/redux/cart/cartSlice';
import { useAppSelector } from '@/redux/hooks';
import css from './Header.module.scss';
import { Container } from '@/UI/common/Container';
import { HeaderNavLink } from '../HeaderNavLink';
import { Logo } from '../Logo';
import { Navigation } from '../Navigation';
import { PhoneNumbersSet } from '../PhoneNumbersSet';

export function Header() {
  const [itemsInCart, setItemsInCart] = useState(0);

  const items = useAppSelector(getFilledCart);

  useEffect(() => {
    setItemsInCart(items.length);
  }, [items]);

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
              hrefProp={'/underDevelopment'}
              svg="user"
              text={'Увійти'}
            />
            <HeaderNavLink hrefProp={'/cart'} svg="basket" text={itemsInCart} />
          </div>
        </div>
      </Container>
      <Navigation />
    </header>
  );
}
