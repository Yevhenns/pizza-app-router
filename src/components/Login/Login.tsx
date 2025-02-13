'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { googleSignIn } from '@/store/auth/authOperations';
import {
  addUserInfo,
  getUserInfo,
  getUserToken,
  logout,
} from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  clearOrderHistory,
  getUserProducts,
} from '@/store/userOrders/userOrdersSlice';
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

      return toast.success('Вхід виконано успішно', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeButton: false,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(getUserProducts(token));
    }
  }, [dispatch, token]);

  return (
    <div className={css.layout}>
      {!userInfo ? (
        <div className={css.authWrapper}>
          {login ? (
            <AuthForm key="login" type="login" />
          ) : (
            <AuthForm key="register" type="register" />
          )}

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

              return toast.error('Сталася помилка', {
                position: 'top-center',
                autoClose: 1500,
                hideProgressBar: true,
                closeButton: false,
              });
            }}
          />
        </div>
      ) : (
        <UserOrders logoutHandler={logoutHandler} userInfo={userInfo} />
      )}
    </div>
  );
}
