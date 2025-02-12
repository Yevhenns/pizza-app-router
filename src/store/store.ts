import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { PERSIST, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authSlice } from './auth/authSlice';
import { cartSlice } from './cart/cartSlice';
import { productsSlice } from './products/productsSlice';
import { userOrdersSlice } from './userOrders/userOrdersSlice';

const cartPersistConfig = {
  key: 'cartItems-v1',
  storage,
  whitelist: ['cartItems', 'customerInfo'],
};

const favoritePersistConfig = {
  key: 'favoriteProducts-v1',
  storage,
  whitelist: ['favoriteProducts'],
};

const authPersistConfig = {
  key: 'auth-v1',
  storage,
  whitelist: ['userInfo', 'token'],
};

const userOrdersPersistConfig = {
  key: 'userOrders-v1',
  storage,
  whitelist: ['userProductsAll'],
};

const rootReducer = combineSlices({
  basket: persistReducer(cartPersistConfig, cartSlice.reducer),
  allProducts: persistReducer(favoritePersistConfig, productsSlice.reducer),
  auth: persistReducer(authPersistConfig, authSlice.reducer),
  userOrders: persistReducer(userOrdersPersistConfig, userOrdersSlice.reducer),
});

export const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [PERSIST],
        },
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const createPersistor = (store: AppStore) => persistStore(store);
