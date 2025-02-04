// type AddtoCartItem = {
//   _id: string;
//   photo: string;
//   quantity: number;
//   title: string;
//   totalPrice: number;
//   optionsTitles: string[];
// };

// type CartItem = {
//   cart_id: string;
// } & AddtoCartItem;

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
  // description: string;
  // dimension: string;
  price: number;
  photo: string;
  // category: string;
  // promotion: boolean;
  // promPrice: number;
  // vegan: boolean;
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

type Ordered = Pick<CartItem, 'title' | 'quantity' | 'optionsTitles'>;

type SummaryOrder = {
  customerInfo: OrderSubmit;
  order: Ordered[];
  orderSum: number;
};
