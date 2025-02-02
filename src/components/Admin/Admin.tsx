'use client';

import { useHideAdmin } from '@/hooks/useHideAdmin';

import { ProductsTable } from './ProductsTable';
import { SupplementsTable } from './SupplementsTable';

type AdminProps = {
  products: Product[];
  supplements: Supplement[];
};

export default function Admin({ products, supplements }: AdminProps) {
  useHideAdmin();

  return (
    <>
      <div>{products.length > 0 && <ProductsTable products={products} />}</div>
      <div>
        {products.length > 0 && <SupplementsTable supplements={supplements} />}
      </div>
    </>
  );
}
