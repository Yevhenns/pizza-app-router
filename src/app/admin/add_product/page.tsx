import { Metadata } from 'next';

import { ProductForm } from '@/components/Admin/ProductForm';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка | Створити',
};

export default function AddProduct() {
  return <ProductForm title="Створити" />;
}
