import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { PERSIST, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authSlice } from './auth/authSlice';
import { cartSlice } from './cart/cartSlice';
import { productsSlice } from './products/productsSlice';
import { userOrdersSlice } from './userOrders/userOrdersSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['basket', 'allProducts', 'auth', 'userAllProducts'],
};

const cartPersistConfig = {
  key: 'filteredBasket-v1',
  storage,
  whitelist: ['filteredBasket'],
};

const favoritePersistConfig = {
  key: 'favoriteProducts-v1',
  storage,
  whitelist: ['favoriteProducts'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
};

const userOrdersPersistConfig = {
  key: 'userOrders',
  storage,
};

const basketReducer = persistReducer(cartPersistConfig, cartSlice.reducer);
const productsReducer = persistReducer(
  favoritePersistConfig,
  productsSlice.reducer
);
const authReducer = persistReducer(authPersistConfig, authSlice.reducer);
const userOrdersReducer = persistReducer(
  userOrdersPersistConfig,
  userOrdersSlice.reducer
);

const rootReducer = combineSlices({
  basket: basketReducer,
  allProducts: productsReducer,
  auth: authReducer,
  userOrders: userOrdersReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
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
