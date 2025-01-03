import {
  filterByCategory,
  filterByPromotion,
} from '@/helpers/filterByCategory';
import { getProductsAll } from '@/utils/getProductsAll';

import { ProductListItem } from './ProductListItem';
import css from './ProductsList.module.scss';

type ProductsListProps = {
  category: string;
};

export async function ProductsList({ category }: ProductsListProps) {
  const products = await getProductsAll();
  console.log(products);

  const data = (() => {
    if (products && products.data && products.data.length > 0) {
      if (category === 'promotions') {
        return filterByPromotion(products.data);
      }
      return filterByCategory(products.data, category);
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
