import Image from 'next/image';

import { getUserInfo } from '@/redux/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';

import css from './Avatar.module.scss';

export function Avatar() {
  const userInfo = useAppSelector(getUserInfo);

  return (
    <Image
      className={css.image}
      src={userInfo?.picture || 'https://placehold.co/34'}
      alt="user photo"
      width={34}
      height={34}
      priority={true}
    />
  );
}
