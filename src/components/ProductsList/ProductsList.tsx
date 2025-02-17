import { getSupplements } from '@/store/products/productsOperations';

import { ProductListItem } from './ProductListItem/ProductListItem';
import css from './ProductsList.module.scss';

type ProductsListProps = {
  products: Product[];
};

export async function ProductsList({ products }: ProductsListProps) {
  const supplements = await getSupplements();

  return (
    <div className={css.list}>
      {products &&
        products.map(item => {
          return (
            <ProductListItem
              key={item._id}
              item={item}
              supplements={supplements}
            />
          );
        })}
    </div>
  );
}
