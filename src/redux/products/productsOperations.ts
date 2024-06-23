import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'http://localhost:3000';
// const BASE_URL = process.env.BASE_URL;

export const getProducts = createAsyncThunk<
  TProductsArr,
  void,
  {
    rejectValue: string;
  }
>('products/getProductsAll', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/api/products`);
    const data: TResponse = await res.json();
    console.log(data.data);

    return data.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
