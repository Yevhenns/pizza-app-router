import {
  filterByCategory,
  filterByPromotion,
} from '@/helpers/filterByCategory';
import {
  getProducts,
  getSupplements,
} from '@/store/products/productsOperations';

import { ProductListItem } from './ProductListItem';
import css from './ProductsList.module.scss';

type ProductsListProps = {
  products: Product[];
};

export async function ProductsList({ products }: ProductsListProps) {
  const supplements = await getSupplements();

  // const data = (() => {
  //   if (products && products.length > 0) {
  //     if (category === 'promotions') {
  //       return filterByPromotion(products);
  //     } else {
  //       return filterByCategory(products, category);
  //     }
  //   }
  // })();

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
