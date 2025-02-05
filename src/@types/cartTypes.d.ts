type CartAddItem = {
  _id: string;
  quantity: number;
  optionsId: string[];
};

type CartItem = {
  cart_id: string;
} & CartAddItem;

type UpdatedCartItem = Pick<CartItem, 'cart_id' | 'quantity' | '_id'> & {
  // cart_id: string;
  // quantity: number;
  options: Supplement[];
  // _id: string;
  title: string;
  price: number;
  photo: string;
};

interface CustomerInfoWithGps {
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

type CustomerInfo = Omit<CustomerInfoWithGps, 'address'> & {
  address?: string;
};

type Ordered = Pick<CartItem2, 'title' | 'quantity'> & {
  optionsTitles: string[];
};

type SummaryOrder = {
  customerInfo: CustomerInfo;
  order: Ordered[];
  orderSum: number;
};
