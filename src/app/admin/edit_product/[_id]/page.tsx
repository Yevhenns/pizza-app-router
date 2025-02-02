import { getProducts } from '@/store/products/productsOperations';

import { ProductForm } from '@/components/Admin/ProductForm';

export default async function EditProduct() {
  const products = await getProducts();

  return <ProductForm products={products} title="Редагувати" />;
}
