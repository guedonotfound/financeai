import { auth } from "@clerk/nextjs/server";
import { getProducts } from "../_data/get-products";
import { getAdminUser } from "../_data/get-admin-user";
import { redirect } from "next/navigation";
import { getOrders } from "../_data/get-orders";
import DesktopOrdersPage from "./_components/desktop/desktop-orders-page";
import MobileOrdersPage from "./_components/mobile/page";

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
    <>
      <div className="hidden min-[900px]:block">
        <DesktopOrdersPage
          products={products}
          pendingOrders={pendingOrders}
          finishedOrders={finishedOrders}
          nonPaidOrders={nonPaidOrders}
        />
      </div>
      <div className="block min-[900px]:hidden">
        <MobileOrdersPage
          products={products}
          pendingOrders={pendingOrders}
          finishedOrders={finishedOrders}
          nonPaidOrders={nonPaidOrders}
        />
      </div>
    </>
  );
};

export default OrdersPage;
