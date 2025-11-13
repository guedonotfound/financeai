"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

interface DeleteOrderParams {
  id: string;
}

export const deleteOrder = async ({ id }: DeleteOrderParams) => {
  await db.order.delete({
    where: {
      id,
    },
  });
  revalidatePath("/orders");
};
