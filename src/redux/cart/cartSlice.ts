import { createSlice } from '@reduxjs/toolkit';
import { sendOrder } from './cartOperations';
import { RootState } from '../store';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  filteredBasket: [] as CartItem[],
  customerInfo: {} as Info,
  orderSum: 0,
  error: null as any,
  isLoading: false,
};

const cartSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem(state, action: { payload: CartItem }) {
      function areOptionsEqual(
        options1: string[],
        options2: string[]
      ): boolean {
        if (options1.length !== options2.length) {
          return false;
        }
        const sortedOptions1 = [...options1].sort();
        const sortedOptions2 = [...options2].sort();

        return sortedOptions1.every(
          (opt, index) => opt === sortedOptions2[index]
        );
      }

      const existingItemIndex = state.filteredBasket.findIndex(
        item =>
          item._id === action.payload._id &&
          areOptionsEqual(item.options, action.payload.options)
      );

      if (existingItemIndex !== -1) {
        state.filteredBasket[existingItemIndex].quantity +=
          action.payload.quantity;
        state.filteredBasket[existingItemIndex].totalPrice +=
          action.payload.totalPrice;
      } else {
        const newCartItem = {
          ...action.payload,
          cart_id: uuidv4(),
        };
        state.filteredBasket = [...state.filteredBasket, newCartItem];
      }
    },
    deleteItem(state, action: { payload: string }) {
      state.filteredBasket = state.filteredBasket.filter(
        (item: CartItem) => item.cart_id !== action.payload
      );
    },
    checkCart(state, action: { payload: Product[] }) {
      state.filteredBasket = state.filteredBasket.filter(({ _id: id1 }) =>
        action.payload.some(({ _id: id2 }) => id1 === id2)
      );
    },
    addInfo(state, action: { payload: Info }) {
      state.customerInfo = action.payload;
    },
    deleteAllItems(state) {
      state.filteredBasket = [];
      state.customerInfo = {} as Info;
    },
    addOrderSum(state, action: { payload: number }) {
      state.orderSum = action.payload;
    },
    setQuantityAndPrice(
      state,
      action: {
        payload: { cart_id: string; quantity: number; totalPrice: number };
      }
    ) {
      const existingItemIndex = state.filteredBasket.findIndex(
        item => item.cart_id === action.payload.cart_id
      );
      state.filteredBasket[existingItemIndex].quantity =
        action.payload.quantity;
      state.filteredBasket[existingItemIndex].totalPrice =
        action.payload.totalPrice;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(sendOrder.pending, state => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        if (!action.payload) {
          state.error = true;
          state.isLoading = false;
          return;
        }
        if (action.payload === 201) {
          state.isLoading = false;
        }
      })
      .addCase(sendOrder.rejected, (state, action) => {
        console.log('err');
        state.isLoading = false;
        state.error = action.payload;
      }),
});

export const cartReducer = cartSlice.reducer;

export const getFilteredCart = (state: RootState) =>
  state.basket.filteredBasket;
export const getCustomerInfo = (state: RootState) => state.basket.customerInfo;
export const getOrderSum = (state: RootState) => state.basket.orderSum;
export const getIsLoading = (state: RootState) => state.basket.isLoading;
export const getError = (state: RootState) => state.basket.error;

export const { addItem } = cartSlice.actions;
export const { deleteItem } = cartSlice.actions;
export const { checkCart } = cartSlice.actions;
export const { addInfo } = cartSlice.actions;
export const { deleteAllItems } = cartSlice.actions;
export const { addOrderSum } = cartSlice.actions;
export const { setQuantityAndPrice } = cartSlice.actions;
