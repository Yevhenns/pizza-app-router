import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { getUserProducts } from './userOrdersOperations';

const initialState = {
  userProductsAll: [] as UserOrders[],
  userId: '',
  error: null as any,
  isLoading: false,
};

const userOrdersSlice = createSlice({
  name: 'userAllProducts',
  initialState,
  reducers: {
    setUserId(state, action: { payload: string }) {
      state.userId = action.payload;
    },
  },
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
          const newArr = action.payload.filter(
            item => item.customerInfo.userId === state.userId
          );
          state.userProductsAll = newArr;
          state.isLoading = false;
        }
      })
      .addCase(getUserProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        return;
      }),
});

export const userProductsReducer = userOrdersSlice.reducer;

export const getUserProductsAll = (state: RootState) =>
  state.userOrders.userProductsAll;
export const getIsLoading = (state: RootState) => state.userOrders.isLoading;
export const getError = (state: RootState) => state.userOrders.error;

export const { setUserId } = userOrdersSlice.actions;
