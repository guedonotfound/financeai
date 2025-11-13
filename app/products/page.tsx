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
    <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Produtos</h1>
        </div>
        <AddProductButton />
      </div>
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Ativos</TabsTrigger>
          <TabsTrigger value="inactive">Inativos</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <ScrollArea>
            <DataTable columns={productColumns} data={activeProducts} />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="inactive">
          <ScrollArea>
            <DataTable columns={productColumns} data={inactiveProducts} />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductsPage;
