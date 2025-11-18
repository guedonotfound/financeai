"use server";

import { db } from "@/app/_lib/prisma";
import { Order } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface UpdateOrderStatusParams {
  id: string;
  field: keyof Pick<Order, "isPaid" | "isDelivered">;
  checked: boolean;
}

export const updateOrderStatus = async (params: UpdateOrderStatusParams) => {
  await db.order.update({
    where: { id: params.id },
    data: {
      [params.field]: params.checked,
    },
  });
  revalidatePath("/orders");
};
