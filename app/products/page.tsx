import { auth } from "@clerk/nextjs/server";
import AddProductButton from "./_components/add-product-button";
import { getAdminUser } from "../_data/get-admin-user";
import { redirect } from "next/navigation";
import { getProducts } from "../_data/get-products";
import DesktopProductsPage from "./_components/desktop/page";
import MobileProductsPage from "./_components/mobile/page";

const ProductsPage = async () => {
  const userId = auth();
  const isAdmin = getAdminUser();
  if (!userId) {
    redirect("/login");
  }
  if (!isAdmin) {
    throw new Error("Unsauthorized");
  }
  const activeProducts = (await getProducts()).activeProducts;
  const inactiveProducts = (await getProducts()).inactiveProducts;
  return (
    <div className="flex h-full flex-col space-y-3 p-2">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <AddProductButton />
      </div>
      <div className="hidden min-[900px]:block">
        <DesktopProductsPage
          activeProducts={activeProducts}
          inactiveProducts={inactiveProducts}
        />
      </div>
      <div className="block min-[900px]:hidden">
        <MobileProductsPage
          activeProducts={activeProducts}
          inactiveProducts={inactiveProducts}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
