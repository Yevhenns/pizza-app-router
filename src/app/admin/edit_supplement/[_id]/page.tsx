import { Metadata } from 'next';

import { getSupplements } from '@/store/products/productsOperations';

import { SupplementForm } from '@/components/Admin/SupplementForm';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка | Редагувати',
};

export default async function EditSupplement() {
  const supplements = await getSupplements();

  return <SupplementForm supplements={supplements} title="Редагувати" />;
}
