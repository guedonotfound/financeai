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
  DialogFooter,
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

interface MobileOrdersCardsProps {
  orders: OrdersResponse["pendingOrders" | "finishedOrders"];
}

const MobileOrdersCards = ({ orders }: MobileOrdersCardsProps) => {
  return (
    <>
      {orders.map((order) => (
        <Dialog key={order.id}>
          <DialogTrigger>
            <Card className="bg-white/5">
              <CardHeader className="p-1">
                <div className="flex items-end gap-2">
                  <p className="font-bold">
                    <span className="text-xs text-muted-foreground">
                      {order.orderNumber}.{" "}
                    </span>
                    {order.name}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="flex justify-between p-2">
                <div>
                  <p className="text-xs text-muted-foreground">Custo</p>
                  <p className="text-sm">{formatCurrency(order.costPrice)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Venda</p>
                  <p className="text-sm">{formatCurrency(order.amount)}</p>
                </div>
              </CardContent>
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
            <DialogFooter>
              <MobileDeleteOrderButton id={order.id} />
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
};

export default MobileOrdersCards;
