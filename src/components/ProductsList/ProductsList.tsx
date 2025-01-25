import {
  filterByCategory,
  filterByPromotion,
} from '@/helpers/filterByCategory';
import { getProducts } from '@/store/products/productsOperations';

import { ProductListItem } from './ProductListItem';
import css from './ProductsList.module.scss';

type ProductsListProps = {
  category: string;
};

export async function ProductsList({ category }: ProductsListProps) {
  const products = await getProducts();

  const data = (() => {
    if (products && products.length > 0) {
      if (category === 'promotions') {
        return filterByPromotion(products);
      } else {
        return filterByCategory(products, category);
      }
    }
  })();

  return (
    <div className={css.list}>
      {data &&
        data.map(item => {
          return <ProductListItem key={item._id} item={item} />;
        })}
    </div>
  );
}
