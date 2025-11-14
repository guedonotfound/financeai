"use server";

import { db } from "@/app/_lib/prisma";

export const getOrders = async () => {
  const pendingOrders = await db.order.findMany({
    where: {
      isDelivered: false,
    },
    orderBy: {
      isPaid: "asc",
    },
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
      isDelivered: true,
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
