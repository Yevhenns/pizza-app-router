type AddtoCartItem1 = {
  _id: string;
  quantity: number;
  optionsId: string[];
};

type CartItem1 = {
  cart_id: string;
} & AddtoCartItem1;

type CartItem2 = {
  cart_id: string;
  quantity: number;
  options: Supplement[];
  _id: string;
  title: string;
  price: number;
  photo: string;
};

interface Info {
  address?: {
    formatted: string;
    lat: number;
    lng: number;
    name: string;
    city: string;
  };
  comment?: string;
  delivery?: boolean;
  name: string;
  number: string;
  userId?: string;
}

interface OrderSubmit {
  address?: string;
  comment?: string;
  delivery?: boolean;
  name: string;
  number: string;
  userId?: string;
}

type Ordered = Pick<CartItem2, 'title' | 'quantity'> & {
  optionsTitles: string[];
};

type SummaryOrder = {
  customerInfo: OrderSubmit;
  order: Ordered[];
  orderSum: number;
};
