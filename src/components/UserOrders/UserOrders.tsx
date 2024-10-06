import { formattedDate } from '@/helpers/formattedDate';

import { CustomJwtPayload } from '@/app/login/page';

import { Button } from '../basic/Button';
import css from './UserOrders.module.scss';

type UserOrdersProps = {
  logoutHandler: () => void;
  userInfo: CustomJwtPayload;
  userOrders: UserOrders[];
};

export function UserOrders({
  logoutHandler,
  userInfo,
  userOrders,
}: UserOrdersProps) {
  return (
    <div className={css.userInfoWrapper}>
      <h2 className={css.heading}>Привіт, {userInfo.name}!</h2>
      {userOrders.length === 0 ? (
        <span>Список замовлень порожній</span>
      ) : (
        <div className={css.orderWrapper}>
          <h3>Список замовлень</h3>
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
                        <span key={opt}>{opt}</span>
                      ))}
                  </div>
                </li>
              ))}
              <span>Загальна сума: {item.orderSum} грн.</span>
            </ul>
          ))}
        </div>
      )}
      <Button onClick={logoutHandler}>Вийти</Button>
    </div>
  );
}
