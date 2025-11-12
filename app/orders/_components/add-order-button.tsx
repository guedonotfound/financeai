"use client";

import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import UpsertOrderDialog from "./upsert-order-dialog";
import { Product } from "@prisma/client";

interface AddOrderButtonProps {
  products: Product[];
}

const AddOrderButton = ({ products }: AddOrderButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogIsOpen(true)}
      >
        Adicionar pedido
      </Button>
      <UpsertOrderDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        products={products}
      />
    </>
  );
};

export default AddOrderButton;
