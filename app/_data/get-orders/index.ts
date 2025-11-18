"use server";

import { db } from "@/app/_lib/prisma";

export const getOrders = async () => {
  const pendingOrders = await db.order.findMany({
    where: {
      isBought: false,
    },
    orderBy: [
      {
        isPaid: "asc",
      },
      { orderNumber: "asc" },
    ],
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });
  const finishedOrders = await db.order.findMany({
    where: {
      isBought: true,
    },
    orderBy: {
      orderNumber: "desc",
    },
    include: {
      products: {
        include: {
          product: true,
        },
      },
    },
  });

  return {
    pendingOrders,
    finishedOrders,
  };
};
