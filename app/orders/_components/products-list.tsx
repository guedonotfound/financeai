"use client";

import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Card } from "@/app/_components/ui/card";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import AddProductToOrderDialog from "./add-product-to-order-dialog";
import { Product } from "@prisma/client";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { ButtonGroup } from "@/app/_components/ui/button-group";

interface FormSchema {
  name: string;
  products: { productId: string; quantity: number }[];
}

interface ProductsListProps {
  form: UseFormReturn<FormSchema>;
  products: Product[];
}

const ProductsList = ({ form, products }: ProductsListProps) => {
  const { fields, append, remove, update } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const handleQuantityChange = (index: number, delta: number) => {
    const current = fields[index];
    const newQuantity = current.quantity + delta;
    if (newQuantity < 1) return;
    update(index, { ...current, quantity: newQuantity });
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="flex items-center justify-between gap-3 rounded-md border p-3">
      <div className="w-full space-y-2">
        {fields.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nenhum produto adicionado ainda.
          </p>
        ) : (
          fields.map((field, index) => {
            const product = products.find((p) => p.id === field.productId);
            return (
              <Card
                key={field.id}
                className="flex items-center justify-between gap-1 bg-white/5 p-3"
              >
                <p className="font-medium">
                  {field.quantity}x {product?.name}
                </p>

                <ButtonGroup>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuantityChange(index, +1)}
                  >
                    <PlusIcon />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuantityChange(index, -1)}
                  >
                    <MinusIcon />
                  </Button>
                  <Button
                    onClick={() => remove(index)}
                    size="sm"
                    variant="destructive"
                  >
                    <TrashIcon />
                  </Button>
                </ButtonGroup>
              </Card>
            );
          })
        )}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button type="button" onClick={() => setIsDialogOpen(true)}>
            <PlusIcon />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar produto</DialogTitle>
          </DialogHeader>

          <AddProductToOrderDialog
            products={products}
            onAdd={(p) => {
              append({ productId: p.id, quantity: 1 });
              setIsDialogOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ProductsList;
