import { PayloadAction } from '@reduxjs/toolkit';

import { createAppSlice } from '../createAppSlice';
import { getProducts } from './productsOperations';

const initialState = {
  productsAll: [] as Product[],
  favoriteProducts: [] as string[],
  error: null as any,
  isLoading: false,
};

export const productsSlice = createAppSlice({
  name: 'allProducts',
  initialState,
  reducers: create => ({
    addToFavoriteAction: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.favoriteProducts = [...state.favoriteProducts, action.payload];
      }
    ),

    removeFromFavoriteAction: create.reducer(
      (state, action: PayloadAction<string>) => {
        state.favoriteProducts = state.favoriteProducts.filter(
          item => item !== action.payload
        );
      }
    ),

    checkFavorites: create.reducer((state, action: PayloadAction<string[]>) => {
      state.favoriteProducts = state.favoriteProducts.filter(favoriteProduct =>
        action.payload.some(item => favoriteProduct === item)
      );
    }),

    getAllProducts: create.asyncThunk(
      async () => {
        const response = await getProducts();

        return response;
      },
      {
        pending: state => {
          state.isLoading = true;
          state.error = false;
        },
        fulfilled: (state, action) => {
          if (!action.payload) {
            state.error = true;
            state.isLoading = false;
            return;
          }
          if (action.payload) {
            state.productsAll = action.payload;
            state.isLoading = false;
          }
        },
        rejected: (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
          return;
        },
      }
    ),
  }),

  selectors: {
    getProductsAll: allProducts => allProducts.productsAll,
    getFavorites: allProducts => allProducts.favoriteProducts,
    getIsLoading: allProducts => allProducts.isLoading,
    getError: allProducts => allProducts.error,
  },
});

export const { getProductsAll, getFavorites, getIsLoading, getError } =
  productsSlice.selectors;

export const {
  addToFavoriteAction,
  removeFromFavoriteAction,
  getAllProducts,
  checkFavorites,
} = productsSlice.actions;
