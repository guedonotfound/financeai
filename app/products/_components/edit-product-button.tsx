"use client";

import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import UpsertProductDialog from "./upsert-product-dialog";
import { Product } from "@prisma/client";

interface EditProductButtonProps {
  product: Product;
}

const EditProductButton = ({ product }: EditProductButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="hidden p-3 text-muted-foreground min-[900px]:block"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <Button
        variant="outline"
        className="block w-full text-muted-foreground min-[900px]:hidden"
        onClick={() => setDialogIsOpen(true)}
      >
        Editar produto
      </Button>
      <UpsertProductDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...product,
          costPrice: Number(product.costPrice),
          amount: Number(product.amount),
        }}
        productId={product.id}
      />
    </>
  );
};

export default EditProductButton;
