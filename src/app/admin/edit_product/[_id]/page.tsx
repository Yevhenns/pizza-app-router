import { Metadata } from 'next';

import {
  getProducts,
  getSupplements,
} from '@/store/products/productsOperations';

import { ProductForm } from '@/components/Admin/forms/ProductForm';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка | Редагувати',
};

export default async function EditProduct() {
  const products = await getProducts();
  const supplements = await getSupplements();

  return (
    <>
      <h2 className="adminPageTitle">Редагувати</h2>
      <ProductForm products={products} supplements={supplements} />
    </>
  );
}
