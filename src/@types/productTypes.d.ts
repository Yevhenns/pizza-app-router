type Product = {
  _id: string;
  title: string;
  description: string;
  dimension: string;
  price: null | number;
  photo: string;
  category: string;
  promotion: boolean;
  promPrice: null | number;
  vegan: boolean;
};

type ProductCreateDto = Omit<Product, '_id'>;

type Supplement = {
  _id: string;
  price: number | null;
  title: string;
  vegan: boolean;
  for_category: 'Піца' | 'Закуски';
};

type SupplementCreateDto = Omit<Supplement, '_id'>;
