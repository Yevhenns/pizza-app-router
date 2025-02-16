import Image from 'next/image';

import { getUserInfo } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';

import css from './Avatar.module.scss';

export function Avatar() {
  const userInfo = useAppSelector(getUserInfo);

  return (
    <>
      {userInfo?.picture && (
        <Image
          className={css.image}
          src={userInfo?.picture}
          alt="user photo"
          width={34}
          height={34}
          priority={true}
        />
      )}
    </>
  );
}
