import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";

interface SummaryCards {
  balance: number;
  investmentsTotal: number;
  depositsTotal: number;
  expensesTotal: number;
}

const SummaryCards = async ({
  balance,
  investmentsTotal,
  depositsTotal,
  expensesTotal,
}: SummaryCards) => {
  return (
    <div className="space-y-6">
      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={investmentsTotal}
          size="small"
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={depositsTotal}
          size="small"
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesa"
          amount={expensesTotal}
          size="small"
        />
      </div>
    </div>
  );
};

export default SummaryCards;
