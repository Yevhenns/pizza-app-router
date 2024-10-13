'use client';

import { useEffect } from 'react';

import { addUserInfo, getUserInfo, logout } from '@/redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getUserProducts } from '@/redux/userOrders/userOrdersOperations';
import { setUserId } from '@/redux/userOrders/userOrdersSlice';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { JwtPayload, jwtDecode } from 'jwt-decode';

import { UserOrders } from '@/components/UserOrders';

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

  useEffect(() => {
    if (userInfo?.sub) {
      dispatch(setUserId(userInfo?.sub));
      dispatch(getUserProducts(userInfo?.sub));
    }
  }, [dispatch, userInfo?.sub]);

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
        <UserOrders logoutHandler={logoutHandler} userInfo={userInfo} />
      )}
    </div>
  );
}
