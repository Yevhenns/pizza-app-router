type AddtoCartItem = {
  _id: string;
  photo: string;
  quantity: number;
  title: string;
  totalPrice: number;
  optionsTitles: string[];
};

type CartItem = {
  cart_id: string;
} & AddtoCartItem;

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

type Ordered = Pick<CartItem, 'title' | 'quantity' | 'optionsTitles'>;

type SummaryOrder = {
  customerInfo: OrderSubmit;
  order: Ordered[];
  orderSum: number;
};
