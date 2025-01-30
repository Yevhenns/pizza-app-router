import Image from 'next/image';

import { getUserInfo } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';
import { deleteProductById } from '@/store/products/productsOperations';

import { Icon } from '@/components/shared/Icon';
import { RoundButton } from '@/components/shared/RoundButton';

import css from './ProductsTable.module.scss';

type ProductsTableProps = {
  products: Product[];
};

export function ProductsTable({ products }: ProductsTableProps) {
  const user = useAppSelector(getUserInfo);

  const deleteProduct = async (id: string) => {
    try {
      if (id && user && user.sub) {
        await deleteProductById(id, user.sub);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <table className={css.table}>
      <thead>
        <tr>
          <th>Фото</th>
          <th>Назва</th>
          <th>Опис</th>
          <th>Ціна</th>
          <th>Деталі</th>
          <th>Категорія</th>
          <th>Ціна</th>
          <th>Знижка</th>
          <th>Веган.</th>
          <th>Дії</th>
        </tr>
      </thead>
      <tbody>
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
                <tr key={_id}>
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
                  <td>
                    <div className={css.buttonsWrapper}>
                      <RoundButton>
                        <Icon
                          svg="edit"
                          iconWidth={34}
                          iconHeight={34}
                          color="green"
                        />
                      </RoundButton>
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
  );
}
