export const roundToHalf = (n) => Math.floor(n * 2) / 2;

export const formatNumber = (n) => {
  if (n === null) return "-";
  const rounded = roundToHalf(n);
  return Number.isInteger(rounded) ? rounded.toString() : rounded.toFixed(1);
};
