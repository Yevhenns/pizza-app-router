import { Metadata } from 'next';

import Admin from '@/components/Admin/Admin';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка',
};

export default async function AdminPage() {
  return <Admin />;
}
