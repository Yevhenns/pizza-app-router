import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_NEST;

export const getUserProducts = createAsyncThunk<
  UserOrders[],
  string,
  {
    rejectValue: string;
  }
>('userProducts/getUserProductsAll', async (userId, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/api/user_orders?userId=${userId}`, {
      // cache: 'no-store',
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
