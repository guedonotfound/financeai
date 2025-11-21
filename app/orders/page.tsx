import { auth } from "@clerk/nextjs/server";
import { getProducts } from "../_data/get-products";
import AddOrderButton from "./_components/add-order-button";
import { getAdminUser } from "../_data/get-admin-user";
import { redirect } from "next/navigation";
import { getOrders } from "../_data/get-orders";
import OrderTabs from "./_components/order-tabs";
import ProfitSummaryCards from "./_components/profit-summary-cards";

const OrdersPage = async () => {
  const userId = auth();
  const isAdmin = getAdminUser();
  if (!userId) {
    redirect("/login");
  }
  if (!isAdmin) {
    throw new Error("Unsauthorized");
  }
  const products = (await getProducts()).activeProducts;
  const pendingOrders = (await getOrders()).pendingOrders;
  const finishedOrders = (await getOrders()).finishedOrders;
  const nonPaidOrders = (await getOrders()).nonPaidOrders;
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

export default OrdersPage;
