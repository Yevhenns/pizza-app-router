'use client';

import { useHideAdmin } from '@/hooks/useHideAdmin';

import css from './Admin.module.scss';
import { ProductsTable } from './ProductsTable';
import { SupplementsTable } from './SupplementsTable';
import { UsersTable } from './UsersTable';

type AdminProps = {
  products: Product[];
  supplements: Supplement[];
};

export default function Admin({ products, supplements }: AdminProps) {
  useHideAdmin();

  return (
    <div className={css.admin}>
      {products.length > 0 && <ProductsTable products={products} />}
      {products.length > 0 && <SupplementsTable supplements={supplements} />}
      <UsersTable />
    </div>
  );
}
