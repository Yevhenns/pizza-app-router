import { Metadata } from 'next';

import { SupplementForm } from '@/components/Admin/forms/SupplementForm';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка | Створити',
};

export default function AddSupplement() {
  return (
    <>
      <h2 className="adminPageTitle">Створити</h2>
      <SupplementForm />
    </>
  );
}
