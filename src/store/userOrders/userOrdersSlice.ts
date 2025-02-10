import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { getUserProducts } from './userOrdersOperations';

const initialState = {
  userProductsAll: [] as UserOrders[],
  error: null as any,
  isLoading: false,
};

export const userOrdersSlice = createSlice({
  name: 'userAllProducts',
  initialState,
  reducers: create => ({
    clearOrderHistory: create.reducer(state => {
      state.userProductsAll = [];
    }),
  }),

  extraReducers: builder =>
    builder
      .addCase(getUserProducts.pending, state => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getUserProducts.fulfilled, (state, action) => {
        if (!action.payload) {
          state.error = true;
          state.isLoading = false;
          return;
        }
        if (action.payload) {
          state.userProductsAll = action.payload;
          state.isLoading = false;
        }
      })
      .addCase(getUserProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        return;
      }),
});

export const getUserProductsAll = (state: RootState) =>
  state.userOrders.userProductsAll;
export const getIsLoading = (state: RootState) => state.userOrders.isLoading;
export const getError = (state: RootState) => state.userOrders.error;

export const { clearOrderHistory } = userOrdersSlice.actions;
