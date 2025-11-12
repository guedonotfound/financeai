import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getAdminUser } from "../_data/get-admin-user";

const OrdersPage = async () => {
  const userId = auth();
  const isAdmin = getAdminUser();
  if (!userId) {
    redirect("/login");
  }
  if (!isAdmin) {
    throw new Error("Unsauthorized");
  }
  return (
    <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Pedidos</h1>
      </div>
    </div>
  );
};

export default OrdersPage;
