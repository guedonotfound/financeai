"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { upsertOrderSchema } from "./schema";

interface UpsertOrderParams {
  id?: string;
  name: string;
  products: { productId: string; quantity: number }[];
}

export const UpsertOrder = async (params: UpsertOrderParams) => {
  console.log(params);

  upsertOrderSchema.parse(params);

  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const productList = params.products.map((product) => product.productId);
  const selectedProducts = await db.product.findMany({
    where: {
      id: {
        in: productList,
      },
    },
  });

  const totalAmount = selectedProducts.reduce((sum, product) => {
    const quantity =
      params.products.find((product) => product.productId === product.productId)
        ?.quantity || 1;
    return sum + Number(product.amount) * quantity;
  }, 0);

  const nextOrderNumber =
    ((
      await db.order.findFirst({
        orderBy: { orderNumber: "desc" },
      })
    )?.orderNumber || 0) + 1;

  await db.order.create({
    data: {
      name: params.name,
      orderNumber: nextOrderNumber,
      userId: userId,
      amount: totalAmount,
      products: {
        create: params.products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
        })),
      },
    },
  });

  revalidatePath("/orders");
};
