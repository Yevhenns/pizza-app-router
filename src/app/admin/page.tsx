'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

import Image from 'next/image';
import { redirect } from 'next/navigation';

import { useWindowWidth } from '@/hooks/useWindowWidth';
import { getUserInfo } from '@/redux/auth/authSlice';
import { useAppSelector } from '@/redux/hooks';
import { getProductsAll } from '@/utils/getProductsAllNest';

import css from './page.module.scss';

export default function Admin() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);

  const ADMIN_ID = process.env.ADMIN_ID;

  const userInfo = useAppSelector(getUserInfo);

  const width = useWindowWidth();

  console.log(products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsAll();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useLayoutEffect(() => {
    if (userInfo?.sub !== ADMIN_ID || width <= 768) {
      redirect('/');
    }
  }, [ADMIN_ID, userInfo?.sub, width]);

  return (
    <div>
      {products &&
        products.map(
          ({
            _id,
            photo,
            title,
            description,
            price,
            dimension,
            category,
            promPrice,
            promotion,
            vegan,
          }) => {
            return (
              <div className={css.listItem} key={_id}>
                <div className={css.columnItem}>
                  <Image
                    src={photo}
                    width={100}
                    height={100}
                    alt="item photo"
                  />
                </div>
                <div className={css.columnItem}>
                  <p>{title}</p>
                </div>
                <div className={css.columnItem}>
                  <p>{description}</p>
                </div>
                <div className={css.columnItem}>
                  <p>{price}</p>
                </div>
                <div className={css.columnItem}>
                  <p>{dimension}</p>
                </div>
                <div className={css.columnItem}>
                  <p>{category}</p>
                </div>
                <div className={css.columnItem}>
                  <p>{promPrice}</p>
                </div>
                <div className={css.columnItem}>
                  {promotion ? <p>Так</p> : <p>Ні</p>}
                </div>
                <div className={css.columnItem}>
                  {vegan ? <p>Так</p> : <p>Ні</p>}
                </div>
              </div>
            );
          }
        )}
    </div>
  );
}
