import { useEffect } from 'react';

import { getUserToken, logout } from '@/store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { jwtDecode } from 'jwt-decode';

export function useLogOutAfterTokenExpires() {
  const token = useAppSelector(getUserToken);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!token) return;

    const { exp } = jwtDecode<{ exp: number }>(token);
    const expiresInMs = exp * 1000 - Date.now();

    if (expiresInMs <= 0) {
      dispatch(logout());
      return;
    }

    const timer = setTimeout(() => dispatch(logout()), expiresInMs);

    return () => clearTimeout(timer);
  }, [token, dispatch]);
}
