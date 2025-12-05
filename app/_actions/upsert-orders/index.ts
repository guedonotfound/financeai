"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { upsertOrderSchema } from "./schema";

interface UpsertOrderParams {
  id?: string;
  name: string;
  products: {
    productId: string;
    quantity: number;
    observations?: string;
  }[];
}

export const UpsertOrder = async (params: UpsertOrderParams) => {
  upsertOrderSchema.parse(params);

  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const selectedProducts = await db.product.findMany({
    where: {
      id: {
        in: params.products.map((p) => p.productId),
      },
    },
  });

  const orderItems = params.products.map((p) => {
    const dbProduct = selectedProducts.find((prod) => prod.id === p.productId);
    if (!dbProduct) throw new Error("Produto não encontrado");

    return {
      productId: p.productId,
      quantity: p.quantity,
      amount: dbProduct.amount,
      costPrice: dbProduct.costPrice,
      observations: p.observations,
    };
  });

  const totalAmount = orderItems.reduce(
    (sum, item) => sum + Number(item.amount) * item.quantity,
    0,
  );

  const totalCostPrice = orderItems.reduce(
    (sum, item) => sum + Number(item.costPrice) * item.quantity,
    0,
  );

  const nextOrderNumber =
    ((
      await db.order.findFirst({
        orderBy: { orderNumber: "desc" },
      })
    )?.orderNumber || 0) + 1;

  if (params.id) {
    await db.order.update({
      where: { id: params.id },
      data: {
        name: params.name,
      },
    });
  } else {
    await db.order.create({
      data: {
        name: params.name,
        orderNumber: nextOrderNumber,
        userId: userId,
        amount: totalAmount,
        costPrice: totalCostPrice,
        products: {
          create: orderItems,
        },
      },
    });
  }

  revalidatePath("/orders");
};
