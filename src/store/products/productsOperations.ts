import { BASE_URL_API } from '@/assets/variables';

// get items
export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${BASE_URL_API}/${endpoint}`, {
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

export const fetchProductsIdList = async (): Promise<string[]> => {
  const response = await fetch(`${BASE_URL_API}/products/id-list`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result: string[] = await response.json();
  return result;
};

// get items by promotion
export const fetchProductsByPromotion = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_URL_API}/products/promotion`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result: { data: Product[] } = await response.json();
  return result.data;
};

// get items by category
export const fetchProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  const response = await fetch(
    `${BASE_URL_API}/products/category/${category}`,
    {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const result: { data: Product[] } = await response.json();
  return result.data;
};

// post item
const addItem = async <T, B extends object>(
  endpoint: string,
  body: B,
  token: string
): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL_API}/${endpoint}`, {
      method: 'POST',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

export const createProduct = async (body: ProductCreateDto, token: string) => {
  return addItem('products', body, token);
};

export const createSupplement = async (
  body: SupplementCreateDto,
  token: string
) => {
  return addItem('supplements', body, token);
};

// patch item
const patchItem = async <T extends object>(
  endpoint: string,
  id: string,
  body: T,
  token: string
): Promise<number> => {
  try {
    const response = await fetch(`${BASE_URL_API}/${endpoint}/${id}`, {
      method: 'PATCH',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

export const updateProduct = (
  productId: string,
  body: ProductCreateDto,
  token: string
) => patchItem('products', productId, body, token);

export const updateSupplement = (
  supplementId: string,
  body: SupplementCreateDto,
  token: string
) => patchItem('supplements', supplementId, body, token);

// delete item
const deleteItem = async (endpoint: string, id: string, token: string) => {
  try {
    const res = await fetch(`${BASE_URL_API}/${endpoint}/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

export const deleteProductById = (productId: string, token: string) =>
  deleteItem('products', productId, token);

export const deleteSupplementById = (supplementId: string, token: string) =>
  deleteItem('supplements', supplementId, token);
