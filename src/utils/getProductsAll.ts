const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_BASE_URL;

export async function getProductsAll() {
  try {
    const res = await fetch(`${BASE_URL}/api/products`);
    const data: ProductsResponse = await res.json();
    return data.data;
  } catch (error: any) {
    return error.message;
  }
}
