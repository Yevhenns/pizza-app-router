import { BASE_URL_API } from '@/assets/variables';

export const getUserProductsList = async (
  token: string
): Promise<UserOrders[]> => {
  try {
    const res = await fetch(`${BASE_URL_API}/users/orders`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data.data;
  } catch (error: any) {
    console.error(error);

    return error.message;
  }
};

export const getUsers = async (token: string): Promise<User[]> => {
  try {
    const res = await fetch(`${BASE_URL_API}/users`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    return data.data;
  } catch (error: any) {
    console.error(error);

    return error.message;
  }
};
