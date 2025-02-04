const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_BASE_URL;

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/api/prodducts`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result: { data: Product[] } = await response.json();

  return result.data;
};

export const getSupplements = async () => {
  const response = await fetch(`${BASE_URL}/api/supplements`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result: { data: Supplement[] } = await response.json();

  return result.data;
};

export const deleteProductById = async (productId: string, userId: string) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/products/${productId}?userId=${userId}`,
      {
        method: 'DELETE',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.log('Помилка на сервері:', errorData);
      throw new Error(errorData.error || 'Не вдалося видалити товар');
    }

    const data = await res.json();
    console.log('Видалений товар:', data);
    return data;
  } catch (error) {
    console.log('Помилка при видаленні товару:', error);
    throw error;
  }
};

export const deleteSupplementById = async (
  supplementId: string,
  userId: string
) => {
  try {
    const res = await fetch(
      `${BASE_URL}/api/supplements/${supplementId}?userId=${userId}`,
      {
        method: 'DELETE',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      console.log('Помилка на сервері:', errorData);
      throw new Error(errorData.error || 'Не вдалося видалити товар');
    }

    const data = await res.json();
    console.log('Видалений товар:', data);
    return data;
  } catch (error) {
    console.log('Помилка при видаленні товару:', error);
    throw error;
  }
};

export const createProduct = async (body: ProductDto, userId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/api/products/?userId=${userId}`, {
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

    return response.status;
  } catch (error: any) {
    console.error('Помилка:', error);
    throw error;
  }
};

export const updateProduct = async (
  productId: string,
  body: ProductDto,
  userId: string
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/products/${productId}?userId=${userId}`,
      {
        method: 'PATCH',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`Помилка ${response.status}: ${await response.text()}`);
    }

    return response.status;
  } catch (error: any) {
    console.error('Помилка:', error);
    throw error;
  }
};

export const updateSupplement = async (
  supplementId: string,
  body: SupplementDto,
  userId: string
) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/supplements/${supplementId}?userId=${userId}`,
      {
        method: 'PATCH',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`Помилка ${response.status}: ${await response.text()}`);
    }

    return response.status;
  } catch (error: any) {
    console.error('Помилка:', error);
    throw error;
  }
};

export const createSupplement = async (body: SupplementDto, userId: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/supplements/?userId=${userId}`,
      {
        method: 'POST',
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      throw new Error(`Помилка ${response.status}: ${await response.text()}`);
    }

    return response.status;
  } catch (error: any) {
    console.error('Помилка:', error);
    throw error;
  }
};
