import { BASE_URL_API } from '@/assets/variables';

export const googleSignIn = async (body: string): Promise<UserResponse> => {
  try {
    const response = await fetch(`${BASE_URL_API}/auth/google-sign_in`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ googleToken: body }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw { status: response.status, message: errorMessage };
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
    const response = await fetch(`${BASE_URL_API}/auth/sign_up`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw { status: response.status, message: errorMessage };
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error('Помилка:', error);
    throw error;
  }
};

export const signIn = async (body: Auth): Promise<UserResponse> => {
  try {
    const response = await fetch(`${BASE_URL_API}/auth/sign_in`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw { status: response.status, message: errorMessage };
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error('Помилка:', error);
    throw error;
  }
};

export const verifyEmail = async (
  verifyToken: string
): Promise<UserResponse> => {
  try {
    const response = await fetch(`${BASE_URL_API}/auth/verify`, {
      method: 'PATCH',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${verifyToken}`,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw { status: response.status, message: errorMessage };
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error('Помилка:', error);
    throw error;
  }
};

export const repeatVerifyEmail = async (body: Auth): Promise<UserResponse> => {
  try {
    const response = await fetch(`${BASE_URL_API}/auth/repeat-verify`, {
      method: 'PATCH',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw { status: response.status, message: errorMessage };
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error('Помилка:', error);
    throw error;
  }
};

export const passwordRecovery = async (body: string): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL_API}/auth/password-recovery`, {
      method: 'PATCH',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: body }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw { status: response.status, message: errorMessage };
    }

    const data = await response.json();

    return data;
  } catch (error: any) {
    console.error('Помилка:', error);
    throw error;
  }
};
