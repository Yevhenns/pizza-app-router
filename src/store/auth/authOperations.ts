const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/v1'
    : process.env.NEXT_PUBLIC_BASE_URL;

export const googleSignIn = async (body: string): Promise<UserResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/google-sign_in`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ googleToken: body }),
    });

    if (!response.ok) {
      throw new Error(`Помилка ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error('Помилка:', error);
    throw error;
  }
};

export const signUp = async (body: Auth): Promise<UserResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/auth/sign_up`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Помилка ${response.status}: ${await response.text()}`);
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error('Помилка:', error);
    throw error;
  }
};
