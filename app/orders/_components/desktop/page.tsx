import { Product } from "@prisma/client";
import AddOrderButton from "../add-order-button";
import OrderTabs from "../order-tabs";
import ProfitSummaryCards from "../profit-summary-cards";
import { getOrders } from "@/app/_data/get-orders";

type OrdersResponse = Awaited<ReturnType<typeof getOrders>>;

interface DesktopOrdersPageProps {
  products: Product[];
  pendingOrders: OrdersResponse["pendingOrders"];
  finishedOrders: OrdersResponse["finishedOrders"];
  nonPaidOrders: OrdersResponse["nonPaidOrders"];
}

const DesktopOrdersPage = ({
  products,
  pendingOrders,
  finishedOrders,
  nonPaidOrders,
}: DesktopOrdersPageProps) => {
  return (
    <div className="flex h-full flex-col space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <ProfitSummaryCards orders={pendingOrders} />
        <AddOrderButton products={products} />
      </div>
      <OrderTabs
        pendingOrders={pendingOrders}
        finishedOrders={finishedOrders}
        nonPaidOrders={nonPaidOrders}
      />
    </div>
  );
};

export default DesktopOrdersPage;
