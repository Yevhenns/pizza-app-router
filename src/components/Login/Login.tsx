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

import { UserOrders } from '../UserOrders/UserOrders';
import { LoaderModal } from '../shared/LoaderModal/LoaderModal';
import { AuthForm } from './AuthForm/AuthForm';
import css from './Login.module.scss';
import { PasswordRecoweryForm } from './PasswordRecoweryForm/PasswordRecoweryForm';

export default function Login() {
  const [action, setAction] = useState<AuthActions>('login');
  const [isLoading, setIsLoading] = useState(false);

  const userInfo = useAppSelector(getUserInfo);
  const token = useAppSelector(getUserToken);

  const dispatch = useAppDispatch();

  const showRecoveryForm = () => {
    setAction('recovery');
  };

  const showLoginForm = () => {
    setAction('login');
  };

  const showRegisterForm = () => {
    setAction('register');
  };

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearOrderHistory());
    googleLogout();
  };

  const sendGoogleToken = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await googleSignIn(token);
      dispatch(addUserInfo(response));
      setIsLoading(false);
      return toast.success('Вхід виконано успішно', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeButton: false,
      });
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      return toast.error('Сталася помилка', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
        closeButton: false,
      });
    }
  };

  useEffect(() => {
    if (token) {
      dispatch(getUserProducts(token));
    }
  }, [dispatch, token]);

  return (
    <div className={css.layout}>
      {isLoading && <LoaderModal />}
      {!userInfo ? (
        <>
          {action !== 'recovery' ? (
            <div className={css.authWrapper}>
              {action === 'login' && <h2>Вхід</h2>}
              {action === 'register' && <h2>Реєстрація</h2>}
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
              <p>або за допомогою Email</p>
              {action === 'login' && (
                <>
                  <AuthForm
                    key="login"
                    type="login"
                    showRecoveryForm={showRecoveryForm}
                  />
                  <button className={css.toggleBtn} onClick={showRegisterForm}>
                    Немає акаунта? Зареєструйся
                  </button>
                </>
              )}

              {action === 'register' && (
                <>
                  <AuthForm key="register" type="register" />
                  <button className={css.toggleBtn} onClick={showLoginForm}>
                    Вже є акаунт? Увійдіть
                  </button>
                </>
              )}
            </div>
          ) : (
            <div className={css.authWrapper}>
              <h2>Відновлення паролю</h2>
              <button
                type="button"
                className={css.backBtn}
                onClick={showLoginForm}
              >
                Назад
              </button>
              <PasswordRecoweryForm showLoginForm={showLoginForm} />
            </div>
          )}
        </>
      ) : (
        <UserOrders logoutHandler={logoutHandler} userInfo={userInfo} />
      )}
    </div>
  );
}
