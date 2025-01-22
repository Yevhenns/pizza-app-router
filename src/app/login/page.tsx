import { Metadata } from 'next';

import Login from '@/components/Login/Login';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Логін',
};

export default async function LoginPage() {
  return <Login />;
}
