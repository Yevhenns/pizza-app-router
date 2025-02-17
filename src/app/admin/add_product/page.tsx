import { Metadata } from 'next';

import { getSupplements } from '@/store/products/productsOperations';

import { ProductForm } from '@/components/Admin/ProductForm/ProductForm';
import { SectionContainer } from '@/components/shared/SectionContainer/SectionContainer';

export const metadata: Metadata = {
  title: 'Nostra Pizza | Адмінка | Створити',
};

export default async function AddProduct() {
  const supplements = await getSupplements();

  return (
    <SectionContainer>
      <h2 className="sectionTitle">Створити</h2>
      <ProductForm supplements={supplements} />
    </SectionContainer>
  );
}
