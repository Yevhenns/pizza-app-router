import { headers } from 'next/headers';

import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_BASE_URL_NEST;

export const getProducts = createAsyncThunk<
  Product[],
  void,
  {
    rejectValue: string;
  }
>('allProducts/getProductsAll', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/api/products`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data: ProductsResponse = await res.json();
    return data.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
