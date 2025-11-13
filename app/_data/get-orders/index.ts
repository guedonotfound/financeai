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
  });
  const finishedOrders = await db.order.findMany({
    where: {
      isDelivered: true,
    },
    orderBy: {
      orderNumber: "desc",
    },
  });

  return {
    pendingOrders,
    finishedOrders,
  };
};
