const calculateDiscount = (original: number, current: number) => {
  if (!original || original <= current) return null;
  return Math.round(((original - current) / original) * 100);
};

const discountPercentage = (original: number, current: number) => {
  const discount = calculateDiscount(original, current);
  return discount !== null ? `${discount}%` : '';
};

export { calculateDiscount, discountPercentage };
