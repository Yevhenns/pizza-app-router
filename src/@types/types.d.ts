interface Product {
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
}

interface Info {
  address?: string | undefined;
  comment?: string;
  delivery: boolean;
  name: string;
  number: string;
}

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
  optionsTitles: string[];
};

type Ordered = Pick<CartItem, 'title' | 'quantity' | 'optionsTitles'>[];

type CartItem = {
  cart_id: string;
  _id: string;
  photo: string;
  quantity: number;
  title: string;
  totalPrice: number;
  optionsTitles: string[];
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
