import Card from "./ui/Card";

interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  tone: "neutral" | "positive" | "negative";
}

const toneStyles: Record<MetricCardProps["tone"], string> = {
  neutral: "text-ink",
  positive: "text-emerald-600",
  negative: "text-rose-600"
};

const MetricCard = ({ label, value, description, tone }: MetricCardProps) => {
  return (
    <Card className="min-h-[160px]" title={label}>
      <div className="space-y-3">
        <p className={`text-3xl font-bold tracking-tight ${toneStyles[tone]}`}>{value}</p>
        <p className="text-sm leading-relaxed text-ink/70">{description}</p>
      </div>
    </Card>
  );
};

export default MetricCard;
