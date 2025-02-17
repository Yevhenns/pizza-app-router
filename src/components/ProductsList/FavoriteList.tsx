import { ProductListItem } from './ProductListItem/ProductListItem';
import css from './ProductsList.module.scss';

type FavoriteListProps = {
  favoriteProducts: Product[];
  supplements: Supplement[];
};

export function FavoriteList({
  favoriteProducts,
  supplements,
}: FavoriteListProps) {
  return (
    <div className={css.list}>
      {favoriteProducts.map(item => {
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
