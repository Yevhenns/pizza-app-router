import { useAppSelector } from '@/store/hooks';
import { getFavorites } from '@/store/products/productsSlice';

import { ProductListItem } from './ProductListItem';
import css from './ProductsList.module.scss';

type FavoriteListProps = {
  supplements: Supplement[];
};

export function FavoriteList({ supplements }: FavoriteListProps) {
  const data = useAppSelector(getFavorites);

  return (
    <div className={css.list}>
      {data.map(item => {
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
