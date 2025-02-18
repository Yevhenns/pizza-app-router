import { Metadata } from 'next';
import Link from 'next/link';

import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

import css from './not-found.module.scss';

export const metadata: Metadata = {
  title: 'Nostra Pizza | 404',
};

export default function NotFound() {
  return (
    <SectionContainer>
      <div className={css.wrapper}>
        <h2>404 - Не знайдено</h2>
        <Link href={'/'}>На головну</Link>
      </div>
    </SectionContainer>
  );
}
