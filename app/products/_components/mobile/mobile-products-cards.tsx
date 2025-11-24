import { Card, CardContent, CardHeader } from "@/app/_components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { getProducts } from "@/app/_data/get-products";
import { getProfit } from "@/app/_data/get-profit";
import { formatCurrency } from "@/app/_utils/currency";
import ProductCheckbox from "../product-checkbox";
import { Separator } from "@/app/_components/ui/separator";
import EditProductButton from "../edit-product-button";

type OrdersResponse = Awaited<ReturnType<typeof getProducts>>;

interface MobileProductsCardsProps {
  products: OrdersResponse["activeProducts" | "inactiveProducts"];
}

const MobileProductsCards = ({ products }: MobileProductsCardsProps) => {
  return (
    <>
      {products.map((product) => (
        <Dialog key={product.id}>
          <DialogTrigger>
            <Card className="flex h-28 flex-col justify-between bg-white/5">
              <CardHeader className="p-0 py-1">
                <p className="font-bold">{product.name}</p>
              </CardHeader>
              <CardContent className="flex justify-between p-2">
                <div>
                  <p className="text-xs text-muted-foreground">Custo</p>
                  <p className="text-sm">{formatCurrency(product.costPrice)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Venda</p>
                  <p className="text-sm">{formatCurrency(product.amount)}</p>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <p>Detalhes do produto</p>
            </DialogHeader>
            <Separator />
            <div className="flex items-end gap-2">
              <p className="text-sm text-muted-foreground">Nome:</p>
              <p className="font-bold">{product.name}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-sm text-muted-foreground">Preço de custo:</p>
              <p className="font-bold">{formatCurrency(product.costPrice)}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-sm text-muted-foreground">Valor de venda:</p>
              <p className="font-bold">{formatCurrency(product.amount)}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-sm text-muted-foreground">Lucro:</p>
              <p className="font-bold">
                {
                  getProfit(Number(product.amount), Number(product.costPrice))
                    .value
                }{" "}
                -{" "}
                {
                  getProfit(Number(product.amount), Number(product.costPrice))
                    .percentage
                }
                %
              </p>
            </div>
            <Separator />
            <div className="flex items-center justify-center gap-4">
              <ProductCheckbox product={product} />
              <p>Ativo</p>
            </div>
            <DialogFooter>
              <div>
                <Separator />
                <EditProductButton product={product} />
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </>
  );
};

export default MobileProductsCards;
