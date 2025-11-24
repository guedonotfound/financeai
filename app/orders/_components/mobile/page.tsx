import { Prisma, Product } from "@prisma/client";
import ProfitSummaryCards from "../profit-summary-cards";
import AddOrderButton from "../add-order-button";
import OrderTabs from "../order-tabs";

type OrderWithProducts = Prisma.OrderGetPayload<{
  include: {
    products: {
      include: {
        product: true;
      };
    };
  };
}>;

interface MobileOrdersPageProps {
  products: Product[];
  pendingOrders: OrderWithProducts[];
  finishedOrders: OrderWithProducts[];
  nonPaidOrders: number;
}

const MobileOrdersPage = ({
  products,
  pendingOrders,
  finishedOrders,
  nonPaidOrders,
}: MobileOrdersPageProps) => {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <AddOrderButton products={products} />
      </div>
      <div className="flex items-center justify-between">
        <ProfitSummaryCards orders={pendingOrders} />
      </div>
      <OrderTabs
        pendingOrders={pendingOrders}
        finishedOrders={finishedOrders}
        nonPaidOrders={nonPaidOrders}
      />
    </div>
  );
};

export default MobileOrdersPage;
