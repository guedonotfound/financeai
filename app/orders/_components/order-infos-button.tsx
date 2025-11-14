import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { formatCurrency } from "@/app/_utils/currency";
import { OrderProduct, Product } from "@prisma/client";
import { InfoIcon } from "lucide-react";

interface OrderInfosButtonProps {
  products: (OrderProduct & {
    product: Product;
  })[];
}

const OrderInfosButton = ({ products }: OrderInfosButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <InfoIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="pb-3">Itens do pedido</DialogTitle>
        </DialogHeader>
        {products.map((product) => (
          <Card key={product.productId} className="p-2">
            <CardContent className="flex items-center justify-between px-3 py-0">
              <p>{product.quantity}x</p>
              <p>{product.product.name}</p>
              <p>{formatCurrency(Number(product.amount))} cada</p>
            </CardContent>
          </Card>
        ))}
      </DialogContent>
    </Dialog>
  );
};
export default OrderInfosButton;
