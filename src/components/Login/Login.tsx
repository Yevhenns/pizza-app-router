'use client';

import { useEffect } from 'react';

import { googleSignIn } from '@/store/auth/authOperations';
import { addUserInfo, getUserInfo, logout } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUserProducts } from '@/store/userOrders/userOrdersOperations';
import { setUserId } from '@/store/userOrders/userOrdersSlice';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

import { UserOrders } from '@/components/UserOrders';

import css from './Login.module.scss';

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
      const response = await googleSignIn(token);
      dispatch(addUserInfo(response));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (userInfo?._id) {
      dispatch(setUserId(userInfo._id));
      // dispatch(getUserProducts(userInfo?.sub));
    }
  }, [dispatch, userInfo?._id]);

  return (
    <div className={css.layout}>
      {userInfo === null ? (
        <GoogleLogin
          onSuccess={credentialResponse => {
            if (credentialResponse.credential) {
              sendGoogleToken(credentialResponse.credential);
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
