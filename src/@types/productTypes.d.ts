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

type ProductItem = {
  _id: string;
  totalQuantity: number;
  promotion: boolean;
  totalPrice: number;
  totalPromPrice: number;
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
