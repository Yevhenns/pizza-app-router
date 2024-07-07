import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL =
  (process.env.NODE_ENV === 'development' && 'http://localhost:3000') ||
  (process.env.NODE_ENV === 'production' && process.env.BASE_URL);

export const sendOrder = createAsyncThunk<
  number,
  SummaryOrder,
  {
    rejectValue: string;
  }
>('basket/sendOrder', async (order, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/send_email`, order);
    return res.status;
  } catch (error: any) {
    return rejectWithValue(error.message as string);
  }
});
