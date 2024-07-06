import { createSlice } from '@reduxjs/toolkit';
import { getProducts } from './productsOperations';
import { RootState } from '../store';

const initialState = {
  productsAll: [] as Product[],
  promotions: [] as Product[],
  favorites: [] as Product[],
  error: null as any,
  isLoading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToFavoriteAction(state, action: { payload: Product }) {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFromFavoriteAction(state, action: { payload: string }) {
      state.favorites = state.favorites.filter(
        item => item._id !== action.payload
      );
    },
  },
  extraReducers: builder =>
    builder
      .addCase(getProducts.pending, state => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        if (!action.payload) {
          state.error = true;
          state.isLoading = false;
          return;
        }
        if (action.payload) {
          const getByPromotion = () => {
            return action.payload.filter(
              (item: Product) => item.promotion === true
            );
          };
          state.productsAll = action.payload;
          state.promotions = getByPromotion();
          const filteredFavoriteProducts = state.favorites.filter(
            ({ _id: id1 }) => action.payload.some(({ _id: id2 }) => id1 === id2)
          );
          state.favorites = filteredFavoriteProducts;
          state.isLoading = false;
        }
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        return;
      }),
});

export const productsReducer = productsSlice.reducer;

export const getProductsAll = (state: RootState) => state.products.productsAll;
export const getPromotions = (state: RootState) => state.products.promotions;
export const getFavorites = (state: RootState) => state.products.favorites;
export const getIsLoading = (state: RootState) => state.products.isLoading;
export const getError = (state: RootState) => state.products.error;

export const { addToFavoriteAction } = productsSlice.actions;
export const { removeFromFavoriteAction } = productsSlice.actions;
