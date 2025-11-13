"use client";

import { formatCurrency } from "@/app/_utils/currency";
import { Order } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import OrderCheckbox from "../_components/order-payment-checkbox";

export const orderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "orderNumber",
    header: "Nº Pedido",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">Valor</div>,
    cell: ({ row: { original: order } }) => {
      return (
        <div className="text-center">
          {formatCurrency(Number(order.amount))}
        </div>
      );
    },
  },
  {
    accessorKey: "isPaid",
    header: () => <div className="text-center">Pago</div>,
    cell: ({ row: { original: order } }) => {
      return (
        <div className="flex justify-around">
          <OrderCheckbox field="isPaid" order={order} />
        </div>
      );
    },
  },
];
