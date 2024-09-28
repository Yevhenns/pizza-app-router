import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { PERSIST, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authReducer } from './auth/authSlice';
import { cartReducer } from './cart/cartSlice';
import { productsReducer } from './products/productsSlice';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['basket', 'allProducts', 'auth'],
};

const cartPersistConfig = {
  key: 'filteredBasket',
  storage,
  whitelist: ['filteredBasket'],
};

const favoritePersistConfig = {
  key: 'favoriteProducts',
  storage,
  whitelist: ['favoriteProducts'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
};

const rootReducer = combineReducers({
  basket: persistReducer(cartPersistConfig, cartReducer),
  allProducts: persistReducer(favoritePersistConfig, productsReducer),
  auth: persistReducer(authPersistConfig, authReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      },
    }),
});

export const persist = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
