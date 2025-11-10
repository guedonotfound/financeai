import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import EmptyCard from "../transactions/_components/empty-card";
import SummaryCards from "./_components/summary-cards";
import TimeSelect from "./_components/time-select";
import { isMatch } from "date-fns";
import { db } from "../_lib/prisma";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";

interface HomeProps {
  searchParams: {
    month: string;
  };
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect("?month=01");
  }

  const dashboard = await getDashboard(month);

  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>
      {transactions.length > 0 ? (
        <>
          <div className="grid grid-cols-[2fr,1fr]">
            <SummaryCards {...dashboard} />
          </div>
          <div className="grid grid-cols-3 grid-rows-1 gap-6">
            <TransactionsPieChart />
          </div>
        </>
      ) : (
        <div className="flex w-full items-center">
          <EmptyCard />
        </div>
      )}
    </div>
  );
};

export default Home;
