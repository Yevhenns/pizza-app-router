import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/v1'
    : process.env.NEXT_PUBLIC_BASE_URL;

export const getUserProducts = createAsyncThunk<
  UserOrders[],
  string,
  {
    rejectValue: string;
  }
>('userProducts/getUserProductsAll', async (userId, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/user_orders/${userId}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();

    return data.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
