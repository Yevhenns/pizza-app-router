import { Metadata } from 'next';

import { getProducts } from '@/store/products/productsOperations';

import { ProductForm } from '@/components/Admin/forms/ProductForm';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка | Редагувати',
};

export default async function EditProduct() {
  const products = await getProducts();

  return (
    <>
      <h2>Редагувати</h2>
      <ProductForm products={products} />
    </>
  );
}
