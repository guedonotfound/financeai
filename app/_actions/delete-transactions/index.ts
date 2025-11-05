"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

interface DeleteTransactionsParams {
  id: string;
}

export const deleteTransactions = async (params: DeleteTransactionsParams) => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db.transaction.delete({
    where: {
      id: params.id,
      userId,
    },
  });
  revalidatePath("/transactions");
};
