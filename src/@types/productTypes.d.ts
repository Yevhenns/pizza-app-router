type Product = {
  _id: string;
  title: string;
  description: string;
  dimension: string;
  price: number;
  photo: string;
  category: string;
  promotion: boolean;
  promPrice: number;
  vegan: boolean;
};

type ProductSchema = Omit<Product, '_id'>;

type ProductDto = Omit<ProductSchema, 'price' | 'promPrice' | 'photo'> & {
  price: number | null;
  promPrice: number | null;
  photo: string | null;
};

type Supplement = {
  _id: string;
  price: number;
  title: string;
  vegan: boolean;
  for_category: 'Піца' | 'Закуски';
};

type SupplementSchema = Omit<Supplement, '_id'>;

type SupplementDto = Omit<Supplement, '_id' | 'price'> & {
  price: number | null;
};

type UserOrders = {
  _id: string;
  customerInfo: Info;
  order: ({ _id: string } & Ordered)[];
  orderSum: number;
  createdAt: string;
};

type UserOrdersSchema = Omit<UserOrders, '_id'>;
