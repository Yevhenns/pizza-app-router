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

type Info = {
  address?: string | undefined;
  comment?: string;
  delivery: boolean;
  name: string;
  number: string;
};

type Ordered = Pick<CartItem, 'title' | 'quantity' | 'options'>[];

type SummaryOrder = {
  customerInfo: Info;
  order: Ordered;
  orderSum: number;
};

type AddtoCartItem = {
  _id: string;
  photo: string;
  quantity: number;
  title: string;
  totalPrice: number;
  options: string[];
};

type CartItem = {
  cart_id: string;
  _id: string;
  photo: string;
  quantity: number;
  title: string;
  totalPrice: number;
  options: string[];
};

type ProductItem = {
  _id: string;
  totalQuantity: number;
  promotion: boolean;
  totalPrice: number;
  totalPromPrice: number;
};

type AddToCart = (
  _id: string,
  totalQuantity: number,
  promotion: boolean,
  totalPrice: number,
  TotalPromPrice: number,
  optionsArray: string[]
) => void;

type ProductsResponse = {
  code: number;
  status: string;
  data: TProductsArr;
};

type WeatherApiResponse = {
  location: {
    name: string;
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        avgtemp_c: string;
        condition: {
          text: string;
          icon: string;
        };
      };
    }[];
  };
};

type FilteredApiResponse = {
  date: string;
  day: {
    avgtemp_c: string;
    condition: {
      text: string;
      icon: string;
    };
  };
}[];

type ForecastDay = {
  date: string;
  avgtemp: string;
  conditionText: string;
  icon: string;
};

type Option = {
  id: string;
  price: number;
  title: string;
  vegan: boolean;
};
