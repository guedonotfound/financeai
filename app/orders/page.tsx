import { db } from "../_lib/prisma";
import AddOrderButton from "./_components/add-order-button";

const OrdersPage = async () => {
  const products = await db.product.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return (
    <div className="flex h-full flex-col space-y-6 overflow-hidden p-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Pedidos</h1>
        <AddOrderButton products={products} />
      </div>
    </div>
  );
};

export default OrdersPage;
