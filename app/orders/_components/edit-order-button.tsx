"use client";

import { Button } from "@/app/_components/ui/button";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import UpsertOrderDialog from "./upsert-order-dialog";
import { Prisma } from "@prisma/client";

interface EditOrderButtonProps {
  order: Prisma.OrderGetPayload<{
    include: { products: { include: { product: true } } };
  }>;
}

const EditOrderButton = ({ order }: EditOrderButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon />
      </Button>
      <UpsertOrderDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        products={order.products.map((product) => product.product)}
        orderId={order.id}
        defaultValues={{
          name: order.name,
          products: order.products.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
            costPrice: Number(product.costPrice),
            observations: product.observations ?? undefined,
          })),
        }}
      />
    </>
  );
};

export default EditOrderButton;
