 export const formatAsPounds = (price: string | number) : string => {
  const pounds = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(Number(price) / 100);

  return pounds;
 }