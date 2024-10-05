interface Info {
  address?: string | undefined;
  comment?: string;
  delivery?: boolean;
  name: string;
  number: string;
  userId?: string;
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

type CartItem = {
  cart_id: string;
  _id: string;
  photo: string;
  quantity: number;
  title: string;
  totalPrice: number;
  optionsTitles: string[];
};

type Ordered = Pick<CartItem, 'title' | 'quantity' | 'optionsTitles'>[];
