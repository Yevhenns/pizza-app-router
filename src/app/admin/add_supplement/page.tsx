import { Metadata } from 'next';

import { SupplementForm } from '@/components/Admin/SupplementForm/SupplementForm';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка | Створити',
};

export default function AddSupplement() {
  return (
    <SectionContainer>
      <h2 className="sectionTitle">Створити</h2>
      <SupplementForm />
    </SectionContainer>
  );
}
