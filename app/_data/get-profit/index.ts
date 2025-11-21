import { formatCurrency } from "@/app/_utils/currency";

export const getProfit = (amount: number, costPrice: number) => {
  const percentage = (((amount - costPrice) / costPrice) * 100).toFixed(2);

  const value = formatCurrency(amount - costPrice);

  return {
    percentage,
    value,
  };
};
