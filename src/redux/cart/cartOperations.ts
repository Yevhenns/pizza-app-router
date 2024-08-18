import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_BASE_URL;

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
    return rejectWithValue(error.message);
  }
});
