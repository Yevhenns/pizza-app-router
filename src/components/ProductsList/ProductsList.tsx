'use server';

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
  console.log(products.length);

  const data = (() => {
    if (category === 'promotions') {
      return filterByPromotion(products);
    }
    return filterByCategory(products, category);
  })();

  return (
    <div className={css.list}>
      {data.map(item => {
        return <ProductListItem key={item._id} item={item} />;
      })}
    </div>
  );
}
