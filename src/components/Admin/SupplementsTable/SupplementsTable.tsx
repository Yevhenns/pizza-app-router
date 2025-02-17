import { useState } from 'react';
import { toast } from 'react-toastify';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { getUserToken } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';
import { deleteSupplementById } from '@/store/products/productsOperations';

import { Icon } from '@/components/shared/Icon/Icon';
import { LoaderModal } from '@/components/shared/LoaderModal/LoaderModal';
import { RoundButton } from '@/components/shared/RoundButton/RoundButton';

import css from '../ProductsTable/ProductsTable.module.scss';

type SupplementsTableProps = {
  supplements: Supplement[];
};

export function SupplementsTable({ supplements }: SupplementsTableProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const token = useAppSelector(getUserToken) as string;

  const deleteSupplement = async (id: string) => {
    setIsLoading(true);
    try {
      await deleteSupplementById(id, token);
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
      <h2 className="sectionTitle">Опції</h2>
      <table className={css.table}>
        <thead>
          <tr>
            <th>№</th>
            <th>Назва</th>
            <th>Ціна</th>
            <th>Для категорії</th>
            <th>Веган.</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {supplements &&
            supplements.map(
              ({ _id, title, price, for_category, vegan }, index) => {
                return (
                  <tr key={_id}>
                    <td>
                      <p>{index + 1}</p>
                    </td>
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
                        <Link href={`/admin/edit_supplement/${_id}`}>
                          <RoundButton>
                            <Icon
                              svg="edit"
                              iconWidth={34}
                              iconHeight={34}
                              color="green"
                            />
                          </RoundButton>
                        </Link>
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
              }
            )}
        </tbody>
      </table>
    </div>
  );
}
