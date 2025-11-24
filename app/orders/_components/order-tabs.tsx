"use client";

import { DataTable } from "@/app/_components/ui/data-table";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { orderColumns } from "../_columns";
import { getOrders } from "@/app/_data/get-orders";
import { useState } from "react";
import { Button } from "@/app/_components/ui/button";
import MobileOrdersCards from "./mobile/mobile-orders-cards";

type OrdersResponse = Awaited<ReturnType<typeof getOrders>>;

interface OrderTabsProps {
  pendingOrders: OrdersResponse["pendingOrders"];
  finishedOrders: OrdersResponse["finishedOrders"];
  nonPaidOrders: OrdersResponse["nonPaidOrders"];
}

const OrderTabs = ({
  pendingOrders,
  finishedOrders,
  nonPaidOrders,
}: OrderTabsProps) => {
  const [activeTab, setActiveTab] = useState("pending");
  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value)}
      className="flex flex-1 flex-col min-[900px]:min-[900px]:overflow-hidden"
    >
      <div className="items-end justify-between min-[900px]:flex">
        <TabsList className="max-[900px]:w-full">
          <TabsTrigger value="pending" className="w-full">
            Pendentes
          </TabsTrigger>
          <TabsTrigger value="finished" className="w-full">
            Finalizados
          </TabsTrigger>
        </TabsList>
        {nonPaidOrders > 0 && (
          <Button
            className="font-bold text-red-500 underline hover:bg-none max-[900px]:w-full"
            variant="ghost"
            onClick={() => setActiveTab("finished")}
          >
            Há pedidos comprados que não foram pagos
          </Button>
        )}
      </div>
      <TabsContent
        value="pending"
        className="flex-1 min-[900px]:overflow-hidden"
      >
        <ScrollArea className="hidden h-full min-[900px]:block">
          <DataTable columns={orderColumns} data={pendingOrders} />
        </ScrollArea>
        <div className="block grid grid-cols-2 gap-4 min-[900px]:hidden">
          <MobileOrdersCards orders={pendingOrders} />
        </div>
      </TabsContent>
      <TabsContent
        value="finished"
        className="flex-1 min-[900px]:overflow-hidden"
      >
        <ScrollArea className="hidden h-full min-[900px]:block">
          <DataTable columns={orderColumns} data={finishedOrders} />
        </ScrollArea>
        <div className="block grid grid-cols-2 gap-4 min-[900px]:hidden">
          <MobileOrdersCards orders={finishedOrders} />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default OrderTabs;
