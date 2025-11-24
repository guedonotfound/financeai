import { formatCurrency } from "@/app/_utils/currency";
import { Order } from "@prisma/client";
import ProfitSummaryCard from "./profit-summary-card";
import { getProfit } from "@/app/_data/get-profit";

interface ProfitSummaryCardsProps {
  orders: Order[];
}

const ProfitSummaryCards = ({ orders }: ProfitSummaryCardsProps) => {
  const totalAmount = orders.reduce(
    (acc, order) => acc + Number(order.amount),
    0,
  );
  const totalCostPrice = orders.reduce(
    (acc, order) => acc + Number(order.costPrice),
    0,
  );
  const totalProfit = getProfit(totalAmount, totalCostPrice).value;
  const totalPercentage = getProfit(totalAmount, totalCostPrice).percentage;
  return (
    <div className="flex w-full justify-around">
      <div className="flex gap-2">
        <ProfitSummaryCard
          title="Custo"
          value={formatCurrency(totalCostPrice)}
        />
        <ProfitSummaryCard title="Venda" value={formatCurrency(totalAmount)} />
        <ProfitSummaryCard
          title="Lucro"
          value={totalProfit + " - " + totalPercentage + "%"}
        />
      </div>
    </div>
  );
};

export default ProfitSummaryCards;
