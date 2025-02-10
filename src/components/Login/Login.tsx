'use client';

import { useEffect } from 'react';

import { googleSignIn } from '@/store/auth/authOperations';
import { addUserInfo, getUserInfo, logout } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUserProducts } from '@/store/userOrders/userOrdersOperations';
import { setUserId } from '@/store/userOrders/userOrdersSlice';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { JwtPayload, jwtDecode } from 'jwt-decode';

import { UserOrders } from '@/components/UserOrders';

import css from './Login.module.scss';

export interface CustomJwtPayload extends JwtPayload {
  name: string;
  picture: string;
}

export default function Login() {
  const userInfo = useAppSelector(getUserInfo);

  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(setUserId(''));
    dispatch(logout());
    googleLogout();
  };

  const sendGoogleToken = async (token: string) => {
    try {
      const response = googleSignIn(token);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
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
            if (credentialResponse.credential) {
              const decoded: CustomJwtPayload = jwtDecode(
                credentialResponse.credential
              );

              sendGoogleToken(credentialResponse.credential);

              // console.log('decoded', decoded);
              // console.log('credentialResponse', credentialResponse);

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
