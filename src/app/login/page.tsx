import { Metadata } from 'next';

import Login from '@/components/Login/Login';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Логін',
};

export default async function LoginPage() {
  return (
    <SectionContainer>
      <Login />
    </SectionContainer>
  );
}
