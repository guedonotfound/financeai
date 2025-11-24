import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { Product } from "@prisma/client";
import MobileProductsCards from "./mobile-products-cards";

interface MobileProductsPageProps {
  activeProducts: Product[];
  inactiveProducts: Product[];
}

const MobileProductsPage = ({
  activeProducts,
  inactiveProducts,
}: MobileProductsPageProps) => {
  return (
    <Tabs
      defaultValue="active"
      className="flex flex-1 flex-col overflow-hidden"
    >
      <TabsList className="w-full">
        <TabsTrigger className="w-full" value="active">
          Ativos
        </TabsTrigger>
        <TabsTrigger className="w-full" value="inactive">
          Inativos
        </TabsTrigger>
      </TabsList>
      <TabsContent value="active" className="mt-3 grid grid-cols-2 gap-4">
        <MobileProductsCards products={activeProducts} />
      </TabsContent>
      <TabsContent value="inactive" className="mt-3 grid grid-cols-2 gap-4">
        <MobileProductsCards products={inactiveProducts} />
      </TabsContent>
    </Tabs>
  );
};

export default MobileProductsPage;
