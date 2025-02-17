import { formattedDate } from '@/helpers/formattedDate';
import { getIsLoading } from '@/store/auth/authSlice';
import { useAppSelector } from '@/store/hooks';
import { getUserProductsAll } from '@/store/userOrders/userOrdersSlice';

import { Button } from '../shared/Button/Button';
import { Loader } from '../shared/Loader/Loader';
import css from './UserOrders.module.scss';

type UserOrdersProps = {
  logoutHandler: () => void;
  userInfo: UserData;
};

export function UserOrders({ logoutHandler, userInfo }: UserOrdersProps) {
  const isLoading = useAppSelector(getIsLoading);
  const userOrders = useAppSelector(getUserProductsAll);

  if (isLoading) {
    return (
      <div className={css.loadingWrapper}>
        <Loader />
        <span>Будь ласка зачекайте</span>
      </div>
    );
  }

  return (
    <div className={css.userInfoWrapper}>
      <h2 className={css.heading}>Привіт, {userInfo.name}!</h2>
      <Button onClick={logoutHandler}>Вийти</Button>
      {userOrders.length === 0 ? (
        <span>Список замовлень порожній</span>
      ) : (
        <>
          <h3>Список замовлень</h3>
          <div className={css.orderWrapper}>
            {userOrders.map(item => (
              <ul key={item._id} className={css.order}>
                <span>{formattedDate(item.createdAt)}</span>
                {item.order.map(item => (
                  <li key={item._id}>
                    <div className={css.titleQuantity}>
                      <span>{item.title}</span>
                      <span>{item.quantity} шт.</span>
                    </div>
                    <div className={css.optionsWrapper}>
                      {item.optionsTitles.length > 0 &&
                        item.optionsTitles.map(opt => (
                          <span key={opt}>+ {opt}</span>
                        ))}
                    </div>
                  </li>
                ))}
                <span>Загальна сума: {item.orderSum} грн.</span>
              </ul>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
