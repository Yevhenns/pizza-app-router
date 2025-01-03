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

type ProductsResponse = {
  code: number;
  status: string;
  data: Product[];
};

type Option = {
  id: string;
  price: number;
  title: string;
  vegan: boolean;
};

type UserOrders = {
  _id: string;
  customerInfo: Info;
  order: ({ _id: string } & Ordered)[];
  orderSum: number;
  createdAt: string;
};
