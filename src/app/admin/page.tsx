import { Metadata } from 'next';
import Link from 'next/link';

import {
  getProducts,
  getSupplements,
} from '@/store/products/productsOperations';

import Admin from '@/components/Admin/Admin';
import { Button } from '@/components/shared/Button/Button';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

import css from './page.module.scss';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка',
};

export default async function AdminPage() {
  const products = await getProducts();
  const supplements = await getSupplements();

  return (
    <SectionContainer>
      <div className={css.admin}>
        <div className={css.btnWrapper}>
          <Link href={'admin/add_product'}>
            <Button>+ Продукт</Button>
          </Link>
          <Link href={'admin/add_supplement'}>
            <Button>+ Опція</Button>
          </Link>
        </div>
        <Admin products={products} supplements={supplements} />
      </div>
    </SectionContainer>
  );
}
