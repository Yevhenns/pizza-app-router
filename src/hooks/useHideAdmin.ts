import { useLayoutEffect } from 'react';

import { redirect } from 'next/navigation';

import { getUserInfo } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';

import { useWindowWidth } from './useWindowWidth';

export function useHideAdmin() {
  const userInfo = useAppSelector(getUserInfo);

  const width = useWindowWidth();

  const minimalScreenWidth = 768;

  useLayoutEffect(() => {
    if (
      (userInfo?.role !== 'Admin' && userInfo?.role !== 'Viewer') ||
      width <= minimalScreenWidth
    ) {
      redirect('/');
    }
  }, [userInfo?.role, width]);
}
