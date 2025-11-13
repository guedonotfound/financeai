"use client";

import { UpdateOrderStatus } from "@/app/_actions/update-order-status";
import { Checkbox } from "@/app/_components/ui/checkbox";
import { Order } from "@prisma/client";
import { redirect } from "next/navigation";
import { useTransition } from "react";

interface OrderCheckboxProps {
  order: Order;
  field: "isPaid" | "isDelivered";
}

const OrderCheckbox = ({ order, field }: OrderCheckboxProps) => {
  const [isPending, startTransition] = useTransition();
  const checked = field === "isPaid" ? order.isPaid : order.isDelivered;

  const handleCheckboxClick = (checked: boolean) => {
    console.log("começando a transition");

    startTransition(async () => {
      console.log("");
      await UpdateOrderStatus({
        id: order.id,
        field,
        checked: checked,
      });
    });
    redirect("/orders");
  };
  return (
    <Checkbox
      id={`${field}-${order.id}`}
      defaultChecked={checked}
      disabled={isPending}
      onCheckedChange={handleCheckboxClick}
    />
  );
};

export default OrderCheckbox;
