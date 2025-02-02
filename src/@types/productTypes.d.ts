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

enum SupplementCategory {
  Pizza = 'Піца',
  Appetizers = 'Закуски',
}

type Supplement = {
  _id: string;
  price: number;
  title: string;
  vegan: boolean;
  for_category: SupplementCategory;
};

type SupplementDto = Omit<Supplement, '_id'>;

type UserOrders = {
  _id: string;
  customerInfo: Info;
  order: ({ _id: string } & Ordered)[];
  orderSum: number;
  createdAt: string;
};
