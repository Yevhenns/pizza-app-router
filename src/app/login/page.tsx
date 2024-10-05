'use client';

import { addUserInfo, getUserInfo, logout } from '@/redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { JwtPayload, jwtDecode } from 'jwt-decode';

import { Button } from '@/components/basic/Button';

import css from './page.module.scss';

export interface CustomJwtPayload extends JwtPayload {
  name: string;
  picture: string;
}

export default function Login() {
  const userInfo = useAppSelector(getUserInfo);

  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    googleLogout();
  };

  return (
    <div className={css.layout}>
      {userInfo === null ? (
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log(credentialResponse);

            if (credentialResponse.credential) {
              const decoded: CustomJwtPayload = jwtDecode(
                credentialResponse.credential
              );
              dispatch(addUserInfo(decoded));
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      ) : (
        <div className={css.userInfoWrapper}>
          <h2 className={css.heading}>Привіт, {userInfo.name}!</h2>
          <Button onClick={logoutHandler}>Вийти</Button>
        </div>
      )}
    </div>
  );
}
