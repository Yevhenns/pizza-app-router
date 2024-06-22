'use client';
import Link from 'next/link';
import { PagesWrapper } from '@/components/PagesWrapper';
import css from '../styles/pages/NotFound.module.scss';

export default function NotFound() {
  return (
    <PagesWrapper title="Nostra pizza - Новинки">
      <div className={css.wrapper}>
        <h2>404 - Page Not Found</h2>
        <Link href={'/'}>На головну</Link>
      </div>
    </PagesWrapper>
  );
}
