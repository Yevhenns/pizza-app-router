import { createAppSlice } from '../createAppSlice';
import { getUserProductsList } from './userOrdersOperations';

const initialState = {
  userProductsAll: [] as UserOrders[],
  error: null as any,
  isLoading: false,
};

export const userOrdersSlice = createAppSlice({
  name: 'userOrders',
  initialState,
  reducers: create => ({
    clearOrderHistory: create.reducer(state => {
      state.userProductsAll = [];
    }),

    getUserProducts: create.asyncThunk(
      async (token: string) => {
        const response = await getUserProductsList(token);

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
            state.userProductsAll = action.payload;
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
    getUserProductsAll: userOrders => userOrders.userProductsAll,
    getIsLoading: userOrders => userOrders.isLoading,
    getError: userOrders => userOrders.error,
  },
});

export const { getUserProductsAll, getIsLoading, getError } =
  userOrdersSlice.selectors;

export const { clearOrderHistory, getUserProducts } = userOrdersSlice.actions;
