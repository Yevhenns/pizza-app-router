'use client';

import { useLayoutEffect } from 'react';

import { redirect } from 'next/navigation';

import { useWindowWidth } from '@/hooks/useWindowWidth';
import { getUserInfo } from '@/redux/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';

export default function Admin() {
  const ADMIN_ID = process.env.ADMIN_ID;

  const userInfo = useAppSelector(getUserInfo);

  const width = useWindowWidth();

  useLayoutEffect(() => {
    if (userInfo?.sub !== ADMIN_ID || width <= 768) {
      redirect('/');
    }
  }, [ADMIN_ID, userInfo?.sub, width]);

  return <div>Адмінка</div>;
}
