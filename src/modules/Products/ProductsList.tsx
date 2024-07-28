'use client';
import { ProductListItem } from './ProductListItem';
import { addItem } from '@/redux/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getFavorites } from '@/redux/products/productsSlice';
import { toast } from 'react-toastify';
import css from './ProductsList.module.scss';

interface ProductsListProps {
  data: Product[];
  options?: Option[];
}

export function ProductsList({ data, options }: ProductsListProps) {
  const dispatch = useAppDispatch();
  const favoriteProducts = useAppSelector(getFavorites);

  const addToCart = (
    _id: string,
    totalQuantity: number,
    promotion: boolean,
    totalPrice: number,
    totalPromPrice: number,
    chosenOptions: string[]
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

  const setFavoriteProducts = (_id: string) => {
    if (favoriteProducts.some(item => item._id === _id)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={css.list}>
      {data.map(item => {
        return (
          <ProductListItem
            key={item._id}
            item={item}
            addToCart={addToCart}
            setFavoriteProducts={setFavoriteProducts}
            favoriteProducts={favoriteProducts}
            options={options}
          />
        );
      })}
    </div>
  );
}
