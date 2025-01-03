const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_NEST;

export async function getProductsAll(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/products`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return error.message;
  }
}
