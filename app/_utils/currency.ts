import { Decimal } from "@prisma/client/runtime/library";

export const formatCurrency = (value: number | Decimal) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
    .format(Number(value))
    .replace(/\s/g, "");
};
