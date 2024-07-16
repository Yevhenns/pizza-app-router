export const filterByCategory = (data: Product[], category: string) => {
  return data
    .filter(item => item.category === category)
    .sort((a, b) => a.title.localeCompare(b.title));
};
