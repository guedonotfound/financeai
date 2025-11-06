import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
// import EmptyCard from "../transactions/_components/empty-card";
import SummaryCards from "./_components/summary-cards";
// import { db } from "../_lib/prisma";

const Home = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }
  // const transactions = await db.transaction.findMany({
  //   where: {
  //     userId,
  //   },
  // });
  return (
    // <div className="flex items-center justify-center">
    //   {transactions.length > 0 ? <SummaryCards /> : <EmptyCard />}
    // </div>
    <SummaryCards />
  );
};

export default Home;
