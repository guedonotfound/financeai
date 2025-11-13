"use client";

import { formatCurrency } from "@/app/_utils/currency";
import { Order } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import OrderCheckbox from "../_components/order-checkbox";
import DeleteOrderButton from "../_components/delete-order-button";

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
        <div className="flex justify-around pr-4">
          <OrderCheckbox field="isPaid" order={order} />
        </div>
      );
    },
  },
  {
    accessorKey: "IsDelivered",
    header: () => <div className="text-center">Entregue</div>,
    cell: ({ row: { original: order } }) => {
      return (
        <div className="flex justify-around pr-4">
          <OrderCheckbox field="isDelivered" order={order} />
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Ações</div>,
    cell: ({ row: { original: order } }) => {
      return (
        <div className="flex justify-around">
          <DeleteOrderButton id={order.id} />
        </div>
      );
    },
  },
];
