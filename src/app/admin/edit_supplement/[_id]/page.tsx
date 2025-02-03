import { Metadata } from 'next';

import { getSupplements } from '@/store/products/productsOperations';

import { SupplementForm } from '@/components/Admin/forms/SupplementForm';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка | Редагувати',
};

export default async function EditSupplement() {
  const supplements = await getSupplements();

  return (
    <>
      <h2 className="adminPageTitle">Редагувати</h2>
      <SupplementForm supplements={supplements} />
    </>
  );
}
