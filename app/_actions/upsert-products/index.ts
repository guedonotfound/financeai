"use server";

import { db } from "@/app/_lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { upsertProductSchema } from "./schema";

interface UpsertProductParams {
  id?: string;
  name: string;
  amount: number;
  costPrice: number;
  isActive?: boolean;
}

export const upsertProduct = async (params: UpsertProductParams) => {
  upsertProductSchema.parse(params);
  const { userId } = auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  await db.product.upsert({
    update: { ...params },
    create: { ...params },
    where: { id: params?.id ?? "" },
  });

  revalidatePath("/products");
};
