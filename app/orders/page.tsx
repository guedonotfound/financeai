import { auth } from "@clerk/nextjs/server";
import { getProducts } from "../_data/get-products";
import AddOrderButton from "./_components/add-order-button";
import { getAdminUser } from "../_data/get-admin-user";
import { redirect } from "next/navigation";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../_components/ui/tabs";
import { ScrollArea } from "../_components/ui/scroll-area";
import { DataTable } from "../_components/ui/data-table";
import { getOrders } from "../_data/get-orders";
import { orderColumns } from "./_columns";

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
  return (
    <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <AddOrderButton products={products} />
      </div>
      <Tabs
        defaultValue="pending"
        className="flex h-full flex-col overflow-hidden"
      >
        <div>
          <TabsList>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="finished">Finalizados</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="pending"
          className="flex h-full flex-col overflow-hidden"
        >
          <ScrollArea>
            <DataTable columns={orderColumns} data={pendingOrders} />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="finished">
          <ScrollArea>
            <DataTable columns={orderColumns} data={finishedOrders} />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrdersPage;
