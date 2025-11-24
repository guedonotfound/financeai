"use client";

import { Product } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { formatCurrency } from "@/app/_utils/currency";
import EditProductButton from "../_components/edit-product-button";
import ProductCheckbox from "../_components/product-checkbox";
import { getProfit } from "@/app/_data/get-profit";

export const productColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "costPrice",
    header: () => <div className="text-center">Preço de custo</div>,
    cell: ({ row: { original: product } }) => {
      return (
        <div className="text-center">
          {formatCurrency(Number(product.costPrice))}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">Valor de venda</div>,
    cell: ({ row: { original: product } }) => {
      return (
        <div className="text-center">
          {formatCurrency(Number(product.amount))}
        </div>
      );
    },
  },
  {
    accessorKey: "profitMargin",
    header: () => <div className="text-center">Porcentagem de lucro</div>,
    cell: ({ row: { original: product } }) => {
      return (
        <div className="text-center">
          {
            getProfit(Number(product.amount), Number(product.costPrice))
              .percentage
          }
          %
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
