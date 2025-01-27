const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_BASE_URL;

export const getProducts = async () => {
  const response = await fetch(`${BASE_URL}/api/products`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result: ProductsResponse = await response.json();

  return result.data;
};

export const getSupplements = async () => {
  const response = await fetch(`${BASE_URL}/api/supplements`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result: SupplementsResponse = await response.json();

  return result.data;
};
