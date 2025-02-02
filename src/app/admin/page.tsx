import { Metadata } from 'next';
import Link from 'next/link';

import { useHideAdmin } from '@/hooks/useHideAdmin';
import {
  getProducts,
  getSupplements,
} from '@/store/products/productsOperations';

import Admin from '@/components/Admin/Admin';
import { Button } from '@/components/shared/Button';

import css from './page.module.scss';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка',
};

export default async function AdminPage() {
  const products = await getProducts();
  const supplements = await getSupplements();

  return (
    <>
      <div className={css.btnWrapper}>
        <Link href={'admin/add_product'}>
          <Button>+ Продукт</Button>
        </Link>
        <Link href={'admin/add_supplement'}>
          <Button>+ Опція</Button>
        </Link>
      </div>
      <Admin products={products} supplements={supplements} />
    </>
  );
}
