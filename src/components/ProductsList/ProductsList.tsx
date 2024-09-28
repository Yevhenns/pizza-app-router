import { filterByCategory } from '@/helpers/filterByCategory';
import { useAppSelector } from '@/redux/hooks';
import {
  getFavorites,
  getProductsAll,
  getPromotions,
} from '@/redux/products/productsSlice';

import { ProductListItem } from './ProductListItem';
import css from './ProductsList.module.scss';

type ProductsListProps = {
  category: string;
};

export function ProductsList({ category }: ProductsListProps) {
  const favoriteProducts = useAppSelector(getFavorites);
  const products = useAppSelector(getProductsAll);
  const promotionProducts = useAppSelector(getPromotions);

  const data = (() => {
    if (category === 'promotions') {
      return promotionProducts;
    }
    if (category === 'favorites') {
      return favoriteProducts;
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
