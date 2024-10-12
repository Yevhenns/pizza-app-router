import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_BASE_URL_NEST;

export const getUserProducts = createAsyncThunk<
  UserOrders[],
  void,
  {
    rejectValue: string;
  }
>('userProducts/getUserProductsAll', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/api/user_orders`, {
      cache: 'no-store',
    });
    const data = await res.json();

    return data.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
