import { DataTable } from "@/app/_components/ui/data-table";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { productColumns } from "../../_columns";
import { Product } from "@prisma/client";

interface DesktopProductsPageProps {
  activeProducts: Product[];
  inactiveProducts: Product[];
}

const DesktopProductsPage = ({
  activeProducts,
  inactiveProducts,
}: DesktopProductsPageProps) => {
  return (
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
  );
};

export default DesktopProductsPage;
