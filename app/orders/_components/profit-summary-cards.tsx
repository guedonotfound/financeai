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
    <div className="flex items-center gap-4">
      <ProfitSummaryCard
        title="Custo total ativo"
        value={formatCurrency(totalCostPrice)}
      />
      <ProfitSummaryCard
        title="Venda total ativa"
        value={formatCurrency(totalAmount)}
      />
      <ProfitSummaryCard
        title="Lucro total ativo"
        value={totalProfit + " - " + totalPercentage + "%"}
      />
    </div>
  );
};

export default ProfitSummaryCards;
