import { Metadata } from 'next';

import { getSupplements } from '@/store/products/productsOperations';

import { ProductForm } from '@/components/Admin/forms/ProductForm';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка | Створити',
};

export default async function AddProduct() {
  const supplements = await getSupplements();

  return (
    <div>
      <h2 className="adminPageTitle">Створити</h2>
      <ProductForm supplements={supplements} />
    </div>
  );
}
