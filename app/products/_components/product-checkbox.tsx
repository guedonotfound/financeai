import { upsertProduct } from "@/app/_actions/upsert-products";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Product } from "@prisma/client";
import { redirect } from "next/navigation";

interface ProductCheckboxProps {
  product: Product;
}

const ProductCheckbox = ({ product }: ProductCheckboxProps) => {
  const handleCheckboxClick = (checked: boolean) => {
    upsertProduct({
      ...product,
      isActive: checked,
      amount: Number(product.amount),
    });
    redirect("/products");
  };

  return (
    <Checkbox
      id={`active-${product.id}`}
      defaultChecked={product.isActive}
      onCheckedChange={handleCheckboxClick}
    />
  );
};

export default ProductCheckbox;
