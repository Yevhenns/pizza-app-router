'use client';

import { useLayoutEffect } from 'react';

import { redirect } from 'next/navigation';

import { getUserInfo } from '@/redux/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';

export default function Admin() {
  const ADMIN_ID = process.env.ADMIN_ID;

  const userInfo = useAppSelector(getUserInfo);

  useLayoutEffect(() => {
    if (userInfo?.sub !== ADMIN_ID) {
      redirect('/');
    }
  }, [ADMIN_ID, userInfo?.sub]);

  return <div>Адмінка</div>;
}
