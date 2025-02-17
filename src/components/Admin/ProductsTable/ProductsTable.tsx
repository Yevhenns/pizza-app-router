import { useState } from 'react';
import { toast } from 'react-toastify';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { getUserToken } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';
import { deleteProductById } from '@/store/products/productsOperations';

import { Icon } from '@/components/shared/Icon/Icon';
import { LoaderModal } from '@/components/shared/LoaderModal/LoaderModal';
import { RoundButton } from '@/components/shared/RoundButton/RoundButton';

import css from './ProductsTable.module.scss';

type ProductsTableProps = {
  products: Product[];
};

export function ProductsTable({ products }: ProductsTableProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const token = useAppSelector(getUserToken) as string;

  const deleteProduct = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteProductById(id, token);
      toast.success('Видалено', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
      });
      router.refresh();
    } catch (e) {
      console.log(e);
      toast.error('Сталася помилка', {
        position: 'top-center',
        autoClose: 1500,
        hideProgressBar: true,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className={css.tableWrapper}>
      {isLoading && <LoaderModal />}
      <h2 className="sectionTitle">Продукти</h2>
      <table className={css.table}>
        <thead>
          <tr>
            <th>№</th>
            <th>Фото</th>
            <th>Назва</th>
            <th>Опис</th>
            <th>Ціна</th>
            <th>Деталі</th>
            <th>Категорія</th>
            <th>Знижка</th>
            <th>Знижка</th>
            <th>Веган.</th>
            <th>Гостра</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map(
              (
                {
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
                  spicy,
                },
                index
              ) => {
                return (
                  <tr key={_id}>
                    <td>
                      <p>{index + 1}</p>
                    </td>
                    <td>
                      <Image
                        src={photo}
                        width={50}
                        height={50}
                        alt="item photo"
                      />
                    </td>
                    <td>
                      <p>{title}</p>
                    </td>
                    <td>
                      <p>{description}</p>
                    </td>
                    <td>
                      <p>{price}</p>
                    </td>
                    <td>
                      <p>{dimension}</p>
                    </td>
                    <td>
                      <p>{category}</p>
                    </td>
                    <td>
                      <p>{promPrice}</p>
                    </td>
                    <td>{promotion ? <p>Так</p> : <p>Ні</p>}</td>
                    <td>{vegan ? <p>Так</p> : <p>Ні</p>}</td>
                    <td>{spicy ? <p>Так</p> : <p>Ні</p>}</td>
                    <td>
                      <div className={css.buttonsWrapper}>
                        <Link href={`/admin/edit_product/${_id}`}>
                          <RoundButton>
                            <Icon
                              svg="edit"
                              iconWidth={34}
                              iconHeight={34}
                              color="green"
                            />
                          </RoundButton>
                        </Link>
                        <RoundButton onClick={() => deleteProduct(_id)}>
                          <Icon
                            svg="remove"
                            iconWidth={34}
                            iconHeight={34}
                            color="red"
                          />
                        </RoundButton>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
        </tbody>
      </table>
    </div>
  );
}
