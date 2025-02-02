import { toast } from 'react-toastify';

import { useRouter } from 'next/navigation';

import { getUserInfo } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';
import { deleteSupplementById } from '@/store/products/productsOperations';

import { Icon } from '@/components/shared/Icon';
import { RoundButton } from '@/components/shared/RoundButton';

import css from '../ProductsTable/ProductsTable.module.scss';

type SupplementsTableProps = {
  supplements: Supplement[];
};

export function SupplementsTable({ supplements }: SupplementsTableProps) {
  const user = useAppSelector(getUserInfo);

  const router = useRouter();

  const deleteSupplement = async (id: string) => {
    try {
      if (id && user && user.sub) {
        await deleteSupplementById(id, user.sub);
        toast.success('Видалено');
        router.refresh();
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={css.tableWrapper}>
      <h2>Опції</h2>
      <table className={css.table}>
        <thead>
          <tr>
            <th>Назва</th>
            <th>Ціна</th>
            <th>Для категорії</th>
            <th>Веган.</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {supplements &&
            supplements.map(({ _id, title, price, for_category, vegan }) => {
              return (
                <tr key={_id}>
                  <td>
                    <p>{title}</p>
                  </td>
                  <td>
                    <p>{price}</p>
                  </td>
                  <td>
                    <p>{for_category}</p>
                  </td>
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
                      <RoundButton onClick={() => deleteSupplement(_id)}>
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
            })}
        </tbody>
      </table>
    </div>
  );
}
