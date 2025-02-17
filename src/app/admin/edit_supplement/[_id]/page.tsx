import { Metadata } from 'next';

import { getSupplements } from '@/store/products/productsOperations';

import { SupplementForm } from '@/components/Admin/SupplementForm/SupplementForm';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка | Редагувати',
};

export default async function EditSupplement() {
  const supplements = await getSupplements();

  return (
    <SectionContainer>
      <h2 className="sectionTitle">Редагувати</h2>
      <SupplementForm supplements={supplements} />
    </SectionContainer>
  );
}
