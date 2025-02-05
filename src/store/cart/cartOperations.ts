import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/v1'
    : process.env.NEXT_PUBLIC_BASE_URL;

export const sendOrder = createAsyncThunk<
  number,
  SummaryOrder,
  {
    rejectValue: string;
  }
>('basket/sendOrder', async (order, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL}/send_email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    });

    if (!res.ok) {
      throw new Error('Failed to send order');
    }

    return res.status;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
