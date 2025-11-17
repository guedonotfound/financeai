import { auth } from "@clerk/nextjs/server";
import AddProductButton from "./_components/add-product-button";
import { getAdminUser } from "../_data/get-admin-user";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { DataTable } from "../_components/ui/data-table";
import { productColumns } from "./_columns";
import { db } from "../_lib/prisma";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../_components/ui/tabs";

const ProductsPage = async () => {
  const userId = auth();
  const isAdmin = getAdminUser();
  if (!userId) {
    redirect("/login");
  }
  if (!isAdmin) {
    throw new Error("Unsauthorized");
  }
  const activeProducts = await db.product.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  const inactiveProducts = await db.product.findMany({
    where: {
      isActive: false,
    },
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className="flex h-full flex-col space-y-6 p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Produtos</h1>
        <AddProductButton />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Tabs
          defaultValue="active"
          className="flex flex-1 flex-col overflow-hidden"
        >
          <div>
            <TabsList>
              <TabsTrigger value="active">Ativos</TabsTrigger>
              <TabsTrigger value="inactive">Inativos</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="active" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <DataTable columns={productColumns} data={activeProducts} />
            </ScrollArea>
          </TabsContent>
          <TabsContent value="inactive" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <DataTable columns={productColumns} data={inactiveProducts} />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductsPage;
