type Role = 'Visitor' | 'Admin';

type User = {
  _id: string;
  picture: string;
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: Role;
  verify?: boolean;
  verificationToken?: null | string;
};

type UserData = Omit<User, 'password'>;

type UserResponse = {
  token: string;
  user: UserData;
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

type Auth = {
  email: string;
  password: string;
  repeatPassword?: string;
};
