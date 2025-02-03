import { useEffect, useState } from 'react';

type useFilterSupplementsProps = {
  supplements: Supplement[];
  category: string;
  vegan: boolean;
};
export function useFilterSupplements({
  supplements,
  category,
  vegan,
}: useFilterSupplementsProps) {
  const [filteredSupplements, setFilteredSupplements] = useState<Supplement[]>(
    []
  );

  useEffect(() => {
    const filteredByCAtegory = supplements.filter(
      item => item.for_category === category
    );
    if (!vegan) {
      setFilteredSupplements(filteredByCAtegory);
    } else {
      const filteredArray = filteredByCAtegory.filter(
        item => item.vegan === vegan
      );
      setFilteredSupplements(filteredArray);
    }
  }, [category, supplements, vegan]);

  return { filteredSupplements };
}
