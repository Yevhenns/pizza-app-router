import { Metadata } from 'next';

import {
  getProducts,
  getSupplements,
} from '@/store/products/productsOperations';

import { ProductForm } from '@/components/Admin/ProductForm/ProductForm';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка | Редагувати',
};

export default async function EditProduct() {
  const products = await getProducts();
  const supplements = await getSupplements();

  return (
    <SectionContainer>
      <h2 className="sectionTitle">Редагувати</h2>
      <ProductForm products={products} supplements={supplements} />
    </SectionContainer>
  );
}
