import { auth } from "@clerk/nextjs/server";
import AddProductButton from "./_components/add-product-button";
import { getAdminUser } from "../_data/get-admin-user";
import { redirect } from "next/navigation";

const ProductsPage = async () => {
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
        <h1 className="text-2xl font-bold">Produtos</h1>
        <AddProductButton />
      </div>
    </div>
  );
};

export default ProductsPage;
