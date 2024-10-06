import { ProductsList } from '@/components/ProductsList';

export const revalidate = 0;

export default function Appetizers() {
  return <ProductsList category="appetizers" />;
}
