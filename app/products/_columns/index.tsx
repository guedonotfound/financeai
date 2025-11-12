"use client";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/app/_utils/currency";
import EditProductButton from "../_components/edit-product-button";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: product } }) =>
      formatCurrency(Number(product.amount)),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: product } }) => {
      return <EditProductButton product={product} />;
    },
  },
];
