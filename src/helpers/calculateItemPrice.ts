type calculateItemPriceProps = {
  options: Supplement[];
  price: number;
  quantity: number;
};

export function calculateItemPrice({
  options,
  price,
  quantity,
}: calculateItemPriceProps) {
  if (options.length === 0) {
    return price * quantity;
  }

  const optionsSum = options.reduce((acc, item) => {
    if (item.price != null) {
      acc += item.price;
    }
    return acc;
  }, 0);
  return (price + optionsSum) * quantity;
}
