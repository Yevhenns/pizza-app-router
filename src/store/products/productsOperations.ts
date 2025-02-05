const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/v1'
    : process.env.NEXT_PUBLIC_BASE_URL;

// get items
export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result: { data: T } = await response.json();
  return result.data;
};

export const getProducts = async () => {
  return fetchData<Product[]>('products');
};

export const getSupplements = async () => {
  return fetchData<Supplement[]>('supplements');
};

// post item
const addItem = async <T, B extends object>(
  endpoint: string,
  body: B,
  userId: string
): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}/?userId=${userId}`, {
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

    return response.status as T;
  } catch (error: any) {
    console.error('Помилка:', error);
    throw error;
  }
};

export const createProduct = async (body: ProductCreateDto, userId: string) => {
  return addItem('products', body, userId);
};

export const createSupplement = async (
  body: SupplementCreateDto,
  userId: string
) => {
  return addItem('supplements', body, userId);
};

// patch item
const patchItem = async <T extends object>(
  endpoint: string,
  id: string,
  body: T,
  userId: string
): Promise<number> => {
  try {
    const response = await fetch(
      `${BASE_URL}/${endpoint}/${id}?userId=${userId}`,
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

export const updateProduct = (
  productId: string,
  body: ProductCreateDto,
  userId: string
) => patchItem('products', productId, body, userId);

export const updateSupplement = (
  supplementId: string,
  body: SupplementCreateDto,
  userId: string
) => patchItem('supplements', supplementId, body, userId);

// delete item
const deleteItem = async (endpoint: string, id: string, userId: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}/${id}?userId=${userId}`, {
      method: 'DELETE',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log('Помилка на сервері:', errorData);
      throw new Error(errorData.error || `Не вдалося видалити ${endpoint}`);
    }

    const data = await res.json();
    console.log(`Видалений елемент з ${endpoint}:`, data);
    return data;
  } catch (error) {
    console.log(`Помилка при видаленні з ${endpoint}:`, error);
    throw error;
  }
};

export const deleteProductById = (productId: string, userId: string) =>
  deleteItem('products', productId, userId);

export const deleteSupplementById = (supplementId: string, userId: string) =>
  deleteItem('supplements', supplementId, userId);
