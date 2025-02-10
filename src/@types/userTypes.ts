type Role = 'Visitor' | 'Admin';

type User = {
  _id: string;
  picture: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: Role;
};

type UserCreateDto = Omit<User, '_id' | 'role'> & { role: 'Visitor' };

type UserOrders = {
  _id: string;
  customerInfo: CustomerInfoWithGps;
  order: ({ _id: string } & Ordered)[];
  orderSum: number;
  createdAt: string;
};

type UserOrdersSchema = Omit<UserOrders, '_id'>;
