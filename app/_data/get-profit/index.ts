import { formatCurrency } from "@/app/_utils/currency";

export const getProfit = (amount: number, costPrice: number) => {
  let percentage: string;
  if (amount !== 0 && costPrice !== 0) {
    percentage = (((amount - costPrice) / costPrice) * 100)
      .toFixed(2)
      .replace(".", ",");
  } else {
    percentage = "0,00";
  }

  const value = formatCurrency(amount - costPrice);

  return {
    percentage,
    value,
  };
};
