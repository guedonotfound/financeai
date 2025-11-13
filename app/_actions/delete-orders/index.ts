import { db } from "@/app/_lib/prisma";

interface DeleteOrderParams {
  id: string;
}

export const deleteOrder = async ({ id }: DeleteOrderParams) => {
  await db.order.delete({
    where: {
      id,
    },
  });
};
