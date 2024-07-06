export const filterByCategory = (data: Product[], category: string) => {
  return data.filter(item => item.category === category);
};
