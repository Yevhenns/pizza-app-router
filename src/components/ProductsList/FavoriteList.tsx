import { useAppSelector } from '@/store/hooks';
import { getFavorites } from '@/store/products/productsSlice';

import { ProductListItem } from './ProductListItem';
import css from './ProductsList.module.scss';

export function FavoriteList() {
  const data = useAppSelector(getFavorites);

  return (
    <div className={css.list}>
      {data.map(item => {
        return <ProductListItem key={item._id} item={item} />;
      })}
    </div>
  );
}
