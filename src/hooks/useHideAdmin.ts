import { useLayoutEffect } from 'react';

import { redirect } from 'next/navigation';

import { getUserInfo } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';

import { useWindowWidth } from './useWindowWidth';

export function useHideAdmin() {
  const ADMIN_ID = process.env.ADMIN_ID;

  const userInfo = useAppSelector(getUserInfo);

  const width = useWindowWidth();

  const minimalScreenWidth = 768;

  useLayoutEffect(() => {
    if (userInfo?.sub !== ADMIN_ID || width <= minimalScreenWidth) {
      redirect('/');
    }
  }, [ADMIN_ID, userInfo?.sub, width]);
}
