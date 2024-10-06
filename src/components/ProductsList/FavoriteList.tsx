import { useAppSelector } from '@/redux/hooks';
import { getFavorites } from '@/redux/products/productsSlice';

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
