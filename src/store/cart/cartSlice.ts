import { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import { createAppSlice } from '../createAppSlice';
import { sendOrder } from './cartOperations';

interface QuantityAndPrice {
  cart_id: string;
  quantity: number;
}

const initialState = {
  filteredBasket: [] as CartItem[],
  updatedCartItems: [] as UpdatedCartItem[],
  customerInfo: {} as CustomerInfo,
  orderSum: 0,
  error: null as any,
  isLoading: false,
};

export const cartSlice = createAppSlice({
  name: 'basket',
  initialState,
  reducers: create => ({
    addCartItem: create.reducer(
      (state, action: PayloadAction<UpdatedCartItem[]>) => {
        state.updatedCartItems = action.payload;
      }
    ),
    addItem: create.reducer((state, action: PayloadAction<CartAddItem>) => {
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
          areOptionsEqual(item.optionsId, action.payload.optionsId)
      );

      if (existingItemIndex !== -1) {
        state.filteredBasket[existingItemIndex].quantity +=
          action.payload.quantity;
        state.updatedCartItems;
      } else {
        const newCartItem = {
          ...action.payload,
          cart_id: uuidv4(),
        };
        state.filteredBasket = [...state.filteredBasket, newCartItem];
      }
    }),

    deleteItem: create.reducer((state, action: PayloadAction<string>) => {
      state.filteredBasket = state.filteredBasket.filter(
        item => item.cart_id !== action.payload
      );
      state.updatedCartItems = state.updatedCartItems.filter(
        item => item.cart_id !== action.payload
      );
    }),

    checkCart: create.reducer((state, action: PayloadAction<Product[]>) => {
      state.filteredBasket = state.filteredBasket.filter(({ _id: id1 }) =>
        action.payload.some(({ _id: id2 }) => id1 === id2)
      );
    }),

    addInfo: create.reducer((state, action: PayloadAction<CustomerInfo>) => {
      state.customerInfo = action.payload;
    }),

    deleteAllItems: create.reducer(state => {
      state.filteredBasket = [];
      state.updatedCartItems = [];
      state.customerInfo = {} as CustomerInfo;
    }),

    addOrderSum: create.reducer((state, action: PayloadAction<number>) => {
      state.orderSum = action.payload;
    }),

    setQuantityAndPrice: create.reducer(
      (state, action: PayloadAction<QuantityAndPrice>) => {
        const existingItemIndex = state.filteredBasket.findIndex(
          item => item.cart_id === action.payload.cart_id
        );
        if (existingItemIndex)
          state.filteredBasket[existingItemIndex].quantity =
            action.payload.quantity;
      }
    ),
  }),

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
  selectors: {
    getUpdatedCartItems: basket => basket.updatedCartItems,
    getFilteredCart: basket => basket.filteredBasket,
    getCustomerInfo: basket => basket.customerInfo,
    getOrderSum: basket => basket.orderSum,
    getIsLoading: basket => basket.isLoading,
    getError: basket => basket.error,
  },
});

export const {
  getUpdatedCartItems,
  getFilteredCart,
  getCustomerInfo,
  getError,
  getIsLoading,
  getOrderSum,
} = cartSlice.selectors;

export const {
  addCartItem,
  addItem,
  deleteItem,
  checkCart,
  addInfo,
  deleteAllItems,
  addOrderSum,
  setQuantityAndPrice,
} = cartSlice.actions;
