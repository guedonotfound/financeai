import { Card, CardContent } from "@/app/_components/ui/card";

interface ProfitSummaryCardProps {
  title: string;
  value: string;
}

const ProfitSummaryCard = ({ title, value }: ProfitSummaryCardProps) => {
  return (
    <Card className="bg-white/5">
      <CardContent className="space-y-3 p-2 text-center">
        <p className="text-xs text-muted-foreground">{title}</p>
        <span className="text-sm">{value}</span>
      </CardContent>
    </Card>
  );
};

export default ProfitSummaryCard;
