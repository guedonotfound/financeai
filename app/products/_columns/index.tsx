"use client";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/app/_utils/currency";
import EditProductButton from "../_components/edit-product-button";
import ProductCheckbox from "../_components/product-checkbox";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">Valor</div>,
    cell: ({ row: { original: product } }) => {
      return (
        <div className="text-center">
          {formatCurrency(Number(product.amount))}
        </div>
      );
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-center">Ações</div>,
    cell: ({ row: { original: product } }) => {
      return (
        <div className="flex justify-around">
          <EditProductButton product={product} />
        </div>
      );
    },
  },
  {
    accessorKey: "active",
    header: () => <div className="text-center">Ativo</div>,
    cell: ({ row: { original: product } }) => {
      return (
        <div className="flex justify-around pr-4">
          <ProductCheckbox product={product} />
        </div>
      );
    },
  },
];
