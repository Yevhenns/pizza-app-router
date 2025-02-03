import { Metadata } from 'next';

import { ProductForm } from '@/components/Admin/forms/ProductForm';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка | Створити',
};

export default function AddProduct() {
  return (
    <>
      <h2 className="adminPageTitle">Створити</h2>
      <ProductForm />
    </>
  );
}
