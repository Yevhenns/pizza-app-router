import { useEffect, useState } from 'react';

import { getUserToken } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';
import { getUsers } from '@/store/userOrders/userOrdersOperations';

import css from '../ProductsTable/ProductsTable.module.scss';

export function UsersTable() {
  const [users, setUsers] = useState<User[] | null>(null);

  const token = useAppSelector(getUserToken) as string;

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getUsers(token);
      setUsers(result);
    };

    fetchUsers();
  }, [token]);

  return (
    <div className={css.tableWrapper}>
      <h2 className="sectionTitle">Користувачі</h2>
      <table className={css.table}>
        <thead>
          <tr>
            <th>№</th>
            <th>Ім&apos;я</th>
            <th>Email</th>
            <th>Номер телефону</th>
            <th>Роль</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map(({ _id, email, name, phoneNumber, role }, index) => {
              return (
                <tr key={_id}>
                  <td>
                    <p>{index + 1}</p>
                  </td>
                  <td>
                    <p>{name}</p>
                  </td>
                  <td>
                    <p>{email}</p>
                  </td>
                  <td>
                    <p>{phoneNumber}</p>
                  </td>
                  <td>{role}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
