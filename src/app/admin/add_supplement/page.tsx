import { Metadata } from 'next';

import { SupplementForm } from '@/components/Admin/SupplementForm';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка | Створити',
};

export default function AddSupplement() {
  return <SupplementForm title="Створити" />;
}
