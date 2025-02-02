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

type ProductDto = Omit<Product, '_id' | 'price' | 'promPrice' | 'photo'> & {
  price: number | null;
  promPrice: number | null;
  photo: string | null;
  upLoadedPhoto?: File | null;
};

type Supplement = {
  _id: string;
  price: number;
  title: string;
  vegan: boolean;
  for_category: 'Піца' | 'Закуски';
};

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
