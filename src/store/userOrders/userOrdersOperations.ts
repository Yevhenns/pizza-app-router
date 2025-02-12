const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/v1'
    : process.env.NEXT_PUBLIC_BASE_URL;

export const getUserProductsList = async (
  token: string
): Promise<UserOrders[]> => {
  try {
    const res = await fetch(`${BASE_URL}/users/orders`, {
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
    const res = await fetch(`${BASE_URL}/users`, {
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
