import { db } from "@/app/_lib/prisma";

export const getProducts = async () => {
  const activeProducts = await db.product.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  const inactiveProducts = await db.product.findMany({
    where: {
      isActive: false,
    },
    orderBy: {
      name: "asc",
    },
  });

  return {
    activeProducts,
    inactiveProducts,
  };
};
