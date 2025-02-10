import { PayloadAction } from '@reduxjs/toolkit';

import { createAppSlice } from '../createAppSlice';

const initialState = {
  userInfo: null as null | UserData,
  token: null as null | string,
  error: null as any,
  isLoading: false,
};

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: create => ({
    addUserInfo: create.reducer(
      (state, action: PayloadAction<UserResponse>) => {
        state.userInfo = action.payload.user;
        state.token = action.payload.token;
      }
    ),

    logout: create.reducer(state => {
      state.userInfo = null;
      state.token = null;
    }),
  }),

  selectors: {
    getUserInfo: auth => auth.userInfo,
    getUserToken: auth => auth.token,
    getIsLoading: auth => auth.isLoading,
    getError: auth => auth.error,
  },
});

export const { getUserInfo, getIsLoading, getError, getUserToken } =
  authSlice.selectors;

export const { addUserInfo, logout } = authSlice.actions;
