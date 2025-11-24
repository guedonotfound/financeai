"use client";

import { upsertProduct } from "@/app/_actions/upsert-products";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Product } from "@prisma/client";
import { toast } from "sonner";

interface ProductCheckboxProps {
  product: Product;
}

const ProductCheckbox = ({ product }: ProductCheckboxProps) => {
  const handleCheckboxClick = async (checked: boolean) => {
    try {
      await upsertProduct({
        ...product,
        isActive: checked,
        costPrice: Number(product.costPrice),
        amount: Number(product.amount),
      });
      toast.success("Protudo atualizado.");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao atualizar produto.");
    }
  };

  return (
    <Checkbox
      id={`active-${product.id}`}
      checked={product.isActive}
      onCheckedChange={() => handleCheckboxClick}
      className="h-5 w-5"
    />
  );
};

export default ProductCheckbox;
