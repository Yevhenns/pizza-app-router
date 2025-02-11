'use client';

import { useEffect, useState } from 'react';

import { googleSignIn } from '@/store/auth/authOperations';
import {
  addUserInfo,
  getUserInfo,
  getUserToken,
  logout,
} from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUserProducts } from '@/store/userOrders/userOrdersOperations';
import { clearOrderHistory } from '@/store/userOrders/userOrdersSlice';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

import { UserOrders } from '@/components/UserOrders';

import { AuthForm } from './AuthForm';
import css from './Login.module.scss';

export default function Login() {
  const [login, setLogin] = useState(true);

  const userInfo = useAppSelector(getUserInfo);
  const token = useAppSelector(getUserToken);

  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearOrderHistory());
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
    if (userInfo?._id && token) {
      dispatch(getUserProducts(token));
    }
  }, [dispatch, token, userInfo?._id]);

  return (
    <div className={css.layout}>
      {!userInfo ? (
        <div className={css.authWrapper}>
          {login ? <AuthForm type="login" /> : <AuthForm type="register" />}

          <button className={css.toggleBtn} onClick={() => setLogin(!login)}>
            {!login ? 'Логін' : 'Реєстрація'}
          </button>
          <p>або за допомогою Google</p>
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
        </div>
      ) : (
        <UserOrders logoutHandler={logoutHandler} userInfo={userInfo} />
      )}
    </div>
  );
}
