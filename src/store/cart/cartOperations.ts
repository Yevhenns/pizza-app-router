import { BASE_URL_API } from '@/assets/variables';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const sendOrder = createAsyncThunk<
  number,
  SummaryOrder,
  {
    rejectValue: string;
  }
>('basket/sendOrder', async (order, { rejectWithValue }) => {
  try {
    const res = await fetch(`${BASE_URL_API}/send_email`, {
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
