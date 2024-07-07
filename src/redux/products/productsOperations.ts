import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL =
  (process.env.NODE_ENV === 'development' && 'http://localhost:3000') ||
  (process.env.NODE_ENV === 'production' && process.env.BASE_URL);

export const getProducts = createAsyncThunk<
  Product[],
  void,
  {
    rejectValue: string;
  }
>('products/getProductsAll', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/api/products`);
    const data: ProductsResponse = await res.json();
    return data.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
