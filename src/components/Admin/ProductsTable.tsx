import Image from 'next/image';

import css from './ProductsTable.module.scss';

type ProductsTableProps = {
  products: Product[] | null;
};

export function ProductsTable({ products }: ProductsTableProps) {
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
                    <p>Ред./Вид.</p>
                  </td>
                </tr>
              );
            }
          )}
      </tbody>
    </table>
  );
}