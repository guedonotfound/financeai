"use client";

import { updateOrderStatus } from "@/app/_actions/update-order-status";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Order } from "@prisma/client";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface OrderCheckboxProps {
  order: Order;
  field: "isPaid" | "isDelivered";
}

const OrderCheckbox = ({ order, field }: OrderCheckboxProps) => {
  const [isPending, startTransition] = useTransition();
  const checked = field === "isPaid" ? order.isPaid : order.isDelivered;

  const handleCheckboxClick = (checked: boolean) => {
    startTransition(async () => {
      try {
        await updateOrderStatus({
          id: order.id,
          field,
          checked: checked,
        });
        toast.success("Pedido atualizado.");
      } catch (error) {
        console.log(error);
        toast.error("Erro ao atualizar pedido.");
      }
    });
    redirect("/orders");
  };
  return (
    <Checkbox
      id={`${field}-${order.id}`}
      defaultChecked={checked}
      disabled={isPending}
      onCheckedChange={handleCheckboxClick}
      className="h-5 w-5"
    />
  );
};

export default OrderCheckbox;
