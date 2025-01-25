import { PayloadAction } from '@reduxjs/toolkit';

import { CustomJwtPayload } from '@/components/Login';

import { createAppSlice } from '../createAppSlice';

const initialState = {
  userInfo: null as null | CustomJwtPayload,
  error: null as any,
  isLoading: false,
};

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: create => ({
    addUserInfo: create.reducer(
      (state, action: PayloadAction<CustomJwtPayload>) => {
        state.userInfo = action.payload;
      }
    ),

    logout: create.reducer(state => {
      state.userInfo = null;
    }),
  }),

  selectors: {
    getUserInfo: auth => auth.userInfo,
    getIsLoading: auth => auth.isLoading,
    getError: auth => auth.error,
  },
});

export const { getUserInfo, getIsLoading, getError } = authSlice.selectors;

export const { addUserInfo, logout } = authSlice.actions;
