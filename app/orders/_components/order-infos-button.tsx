import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
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
            <CardContent className="px-3 py-0">
              <div className="flex items-center justify-between">
                <p>
                  {product.quantity}x {formatCurrency(Number(product.amount))}
                </p>
                <p>{product.product.name}</p>
              </div>
              {product.observations && (
                <Accordion type="single" collapsible>
                  <AccordionItem value={product.observations}>
                    <AccordionTrigger className="text-sm text-muted-foreground">
                      Observações
                    </AccordionTrigger>
                    <AccordionContent className="whitespace-pre-wrap text-xs">
                      {product.observations}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )}
            </CardContent>
          </Card>
        ))}
      </DialogContent>
    </Dialog>
  );
};
export default OrderInfosButton;
