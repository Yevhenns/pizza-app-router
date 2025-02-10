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
  body: B
): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
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

export const createProduct = async (body: ProductCreateDto) => {
  return addItem('products', body);
};

export const createSupplement = async (body: SupplementCreateDto) => {
  return addItem('supplements', body);
};

// patch item
const patchItem = async <T extends object>(
  endpoint: string,
  id: string,
  body: T
): Promise<number> => {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
      method: 'PATCH',
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

export const updateProduct = (productId: string, body: ProductCreateDto) =>
  patchItem('products', productId, body);

export const updateSupplement = (
  supplementId: string,
  body: SupplementCreateDto
) => patchItem('supplements', supplementId, body);

// delete item
const deleteItem = async (endpoint: string, id: string) => {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}/${id}`, {
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

export const deleteProductById = (productId: string) =>
  deleteItem('products', productId);

export const deleteSupplementById = (supplementId: string) =>
  deleteItem('supplements', supplementId);
