type CartAddItem = {
  _id: string;
  quantity: number;
  optionsId: string[];
};

type CartItem = {
  cart_id: string;
} & CartAddItem;

type UpdatedCartItem = Pick<CartItem, 'cart_id' | 'quantity' | '_id'> & {
  options: Supplement[];
  title: string;
  price: number;
  photo: string;
};

interface CustomerInfo {
  address?: string;
  comment?: string;
  delivery?: boolean;
  name: string;
  number: string;
  userId?: string;
}

type Ordered = Pick<UpdatedCartItem, 'title' | 'quantity'> & {
  optionsTitles: string[];
};

type SummaryOrder = {
  customerInfo: CustomerInfo;
  order: Ordered[];
  orderSum: number;
};
