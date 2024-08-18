import { toast } from 'react-toastify';

import { filterByCategory } from '@/helpers/filterByCategory';
import { addItem } from '@/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  getFavorites,
  getProductsAll,
  getPromotions,
} from '@/redux/products/productsSlice';

import { options } from '../../options';
import { ProductListItem } from './ProductListItem';
import css from './ProductsList.module.scss';

type ProductsListProps = {
  category: string;
};

export function ProductsList({ category }: ProductsListProps) {
  const favoriteProducts = useAppSelector(getFavorites);
  const products = useAppSelector(getProductsAll);
  const promotionProducts = useAppSelector(getPromotions);

  const dispatch = useAppDispatch();

  const data = (() => {
    if (category === 'promotions') {
      return promotionProducts;
    }
    if (category === 'favorites') {
      return favoriteProducts;
    }
    return filterByCategory(products, category);
  })();

  const addToCart: AddToCart = (
    _id,
    totalQuantity,
    promotion,
    totalPrice,
    totalPromPrice,
    chosenOptions
  ) => {
    const chosenProduct = data.find(item => item._id === _id);
    if (chosenProduct) {
      const { photo, title, _id } = chosenProduct;
      const cartItem = {
        _id: _id,
        photo: photo,
        title: title,
        quantity: totalQuantity,
        options: chosenOptions,
        totalPrice: promotion ? totalPromPrice : totalPrice,
      };
      dispatch(addItem(cartItem));
      toast.success('Додано до кошика', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
  };

  const checkIsFavoriteProducts = (_id: string) => {
    return favoriteProducts.some(item => item._id === _id);
  };

  return (
    <div className={css.list}>
      {data.map(item => {
        return (
          <ProductListItem
            key={item._id}
            item={item}
            addToCart={addToCart}
            checkIsFavoriteProducts={checkIsFavoriteProducts}
            favoriteProducts={favoriteProducts}
            options={options}
          />
        );
      })}
    </div>
  );
}
