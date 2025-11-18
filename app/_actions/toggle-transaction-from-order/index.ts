"use server";

import { db } from "@/app/_lib/prisma";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";

interface ToggleTransactionFromOrderParams {
  field: "isPaid" | "isBought";
  orderNumber: number;
  amount: number;
  userId: string;
  checked: boolean;
}

export const ToggleTransactionFromOrder = async (
  params: ToggleTransactionFromOrderParams,
) => {
  if (params.checked) {
    await db.transaction.create({
      data: {
        userId: params.userId,
        name: `${params.field === "isPaid" ? "Entrada" : "Compra"} ref. pedido no.${params.orderNumber}`,
        amount: params.amount,
        type:
          params.field === "isPaid"
            ? TransactionType.DEPOSIT
            : TransactionType.EXPENSE,
        category: TransactionCategory.OTHER,
        paymentMethod: TransactionPaymentMethod.OTHER,
        date: new Date(),
      },
    });
  } else {
    await db.transaction.deleteMany({
      where: {
        name: `${params.field === "isPaid" ? "Entrada" : "Compra"} ref. pedido no.${params.orderNumber}`,
        type:
          params.field === "isPaid"
            ? TransactionType.DEPOSIT
            : TransactionType.EXPENSE,
      },
    });
  }
};
