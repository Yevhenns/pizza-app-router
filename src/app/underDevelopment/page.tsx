import { Metadata } from 'next';

import css from './page.module.scss';

export const metadata: Metadata = {
  title: 'Nostra Pizza | В розробці',
};

export default async function underDevelopment() {
  return (
    <div className={css.wrapper}>
      <h2>Сторінка в розробці</h2>
    </div>
  );
}
