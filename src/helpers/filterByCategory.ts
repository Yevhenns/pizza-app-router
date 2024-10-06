export const filterByCategory = (data: Product[], category: string) => {
  return data
    .filter(item => item.category === category)
    .sort((a, b) => a.title.localeCompare(b.title));
};

export const filterByPromotion = (data: Product[]) => {
  return data
    .filter(item => item.promotion)
    .sort((a, b) => a.title.localeCompare(b.title));
};
