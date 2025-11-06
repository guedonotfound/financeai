import AddTransactionButton from "@/app/_components/add-transaction-button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/app/_components/ui/empty";
import { DollarSignIcon } from "lucide-react";

const EmptyCard = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <DollarSignIcon />
        </EmptyMedia>
        <EmptyTitle>Sem informações</EmptyTitle>
        <EmptyDescription>
          Nenhuma transação encontrada, adicione transações para gerenciar as
          finanças
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <AddTransactionButton />
      </EmptyContent>
    </Empty>
  );
};

export default EmptyCard;
