"use client";

import { formatCurrency } from "@/app/_utils/currency";
import { Order, OrderProduct, Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import OrderCheckbox from "../_components/order-checkbox";
import DeleteOrderButton from "../_components/delete-order-button";
import OrderInfosButton from "../_components/order-infos-button";
import { getProfit } from "@/app/_data/get-profit";
import EditOrderButton from "../_components/edit-order-button";

type OrderWithProducts = Order & {
  products: (OrderProduct & {
    product: Product;
  })[];
};

export const orderColumns: ColumnDef<OrderWithProducts>[] = [
  {
    accessorKey: "orderNumber",
    header: "Nº Pedido",
  },
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "costPrice",
    header: () => <div className="text-center">Preço de custo</div>,
    cell: ({ row: { original: order } }) => {
      return (
        <div className="text-center">
          {formatCurrency(Number(order.costPrice))}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">Valor da venda</div>,
    cell: ({ row: { original: order } }) => {
      return (
        <div className="text-center">
          {formatCurrency(Number(order.amount))}
        </div>
      );
    },
  },
  {
    accessorKey: "profit",
    header: () => <div className="text-center">Lucro</div>,
    cell: ({ row: { original: order } }) => {
      return (
        <div className="text-center">
          {getProfit(Number(order.amount), Number(order.costPrice)).value}
          {" - "}
          {getProfit(Number(order.amount), Number(order.costPrice)).percentage}%
        </div>
      );
    },
  },
  {
    accessorKey: "isPaidAndIsDelivered",
    header: () => <div className="text-center">Pago e Comprado</div>,
    cell: ({ row: { original: order } }) => {
      return (
        <div className="flex justify-center gap-2 pr-4">
          <OrderCheckbox field="isPaid" order={order} />
          <OrderCheckbox field="isBought" order={order} />
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Ações</div>,
    cell: ({ row: { original: order } }) => {
      return (
        <div className="flex justify-center">
          <OrderInfosButton products={order.products} />
          <EditOrderButton order={order} />
          <DeleteOrderButton id={order.id} />
        </div>
      );
    },
  },
];
