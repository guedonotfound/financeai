import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Separator } from "@/app/_components/ui/separator";
import { getOrders } from "@/app/_data/get-orders";
import { getProfit } from "@/app/_data/get-profit";
import { formatCurrency } from "@/app/_utils/currency";
import OrderCheckbox from "../order-checkbox";
import MobileDeleteOrderButton from "./mobile-delete-order-burron";

type OrdersResponse = Awaited<ReturnType<typeof getOrders>>;

interface MobileOrderCardProps {
  orders: OrdersResponse["pendingOrders"] | OrdersResponse["finishedOrders"];
}

const MobileOrderCard = ({ orders }: MobileOrderCardProps) => {
  return (
    <>
      {orders.map((order) => (
        <Dialog key={order.id}>
          <DialogTrigger>
            <Card>
              <CardHeader className="p-3">
                <div className="flex items-end gap-2">
                  <p className="text-xs text-muted-foreground">
                    {order.orderNumber}.
                  </p>
                  <p className="text-sm font-bold">{order.name}</p>
                </div>
              </CardHeader>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <p>Detalhes do pedido</p>
            </DialogHeader>
            {order.products.map((product) => (
              <Card key={product.productId} className="p-2">
                <CardContent className="px-3 py-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs">
                      {product.quantity}x{" "}
                      {formatCurrency(Number(product.amount))}
                    </p>
                    <p className="text-sm">{product.product.name}</p>
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
            <Separator />
            <p className="text-muted-foreground">Resumo:</p>
            <div>
              <div className="flex items-end gap-2">
                <p className="p-0 text-sm text-muted-foreground">
                  Preço de custo:
                </p>
                <p>{formatCurrency(order.costPrice)}</p>
              </div>
              <div className="flex items-end gap-2">
                <p className="p-0 text-sm text-muted-foreground">
                  Valor da venda:
                </p>
                <p>{formatCurrency(order.amount)}</p>
              </div>
              <div className="flex items-end gap-2">
                <p className="p-0 text-sm text-muted-foreground">Lucro:</p>
                <p>
                  {
                    getProfit(Number(order.amount), Number(order.costPrice))
                      .value
                  }{" "}
                  -{" "}
                  {
                    getProfit(Number(order.amount), Number(order.costPrice))
                      .percentage
                  }
                  %
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex justify-around">
              <div className="flex gap-2">
                <OrderCheckbox order={order} field="isPaid" />
                <p>Pago</p>
              </div>
              <div className="flex gap-2">
                <OrderCheckbox order={order} field="isBought" />
                <p>Comprado</p>
              </div>
            </div>
            <Separator />
            <MobileDeleteOrderButton id={order.id} />
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
};

export default MobileOrderCard;
