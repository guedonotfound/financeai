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
      className="flex flex-1 flex-col overflow-hidden"
    >
      <div className="flex items-end justify-between">
        <TabsList>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="finished">Finalizados</TabsTrigger>
        </TabsList>
        {nonPaidOrders > 0 && (
          <Button
            className="font-bold text-red-500 underline hover:bg-none"
            variant="ghost"
            onClick={() => setActiveTab("finished")}
          >
            Há pedidos comprados que não foram pagos
          </Button>
        )}
      </div>
      <TabsContent value="pending" className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <DataTable columns={orderColumns} data={pendingOrders} />
        </ScrollArea>
      </TabsContent>
      <TabsContent value="finished" className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <DataTable columns={orderColumns} data={finishedOrders} />
        </ScrollArea>
      </TabsContent>
    </Tabs>
  );
};

export default OrderTabs;
