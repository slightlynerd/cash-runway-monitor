import { useMemo, useState } from "react";
import type { FinancialSummary } from "../types/financial";
import { formatCurrency, formatRunway } from "../utils/formatters";
import { parseMoneyInput } from "../utils/money";
import Card from "./ui/Card";
import Input from "./ui/Input";

interface SafeToSpendWidgetProps {
  currentBalance: number;
  currentSummary: FinancialSummary;
  onSimulate: (oneTimeExpense: number) => FinancialSummary;
}

const SafeToSpendWidget = ({
  currentBalance,
  currentSummary,
  onSimulate
}: SafeToSpendWidgetProps) => {
  const [scenarioAmount, setScenarioAmount] = useState<string>("");

  const parsedScenarioAmount = useMemo(
    () => parseMoneyInput(scenarioAmount),
    [scenarioAmount]
  );

  const projectedSummary = useMemo(
    () => onSimulate(parsedScenarioAmount),
    [onSimulate, parsedScenarioAmount]
  );

  const projectedBalance = Math.max(currentBalance - parsedScenarioAmount, 0);

  return (
    <Card
      title="Safe-to-Spend Simulator"
      subtitle="Test one-off purchases without changing your saved baseline."
    >
      <div className="space-y-4">
        <Input
          id="scenario-expense"
          label="Hypothetical One-Time Expense"
          type="number"
          min={0}
          step="0.01"
          value={scenarioAmount}
          onChange={(event) => setScenarioAmount(event.target.value)}
          hint="Example: buying new equipment or paying legal fees."
        />

        <div className="grid gap-3 rounded-xl border border-ink/15 bg-sand/55 p-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-ink/60">Current Runway</p>
            <p className="text-base font-semibold text-ink">
              {formatRunway(currentSummary.runwayMonths, currentSummary.runwayStatus)}
            </p>
          </div>
          <div>
            <p className="text-ink/60">Projected Runway</p>
            <p className="text-base font-semibold text-ink">
              {formatRunway(projectedSummary.runwayMonths, projectedSummary.runwayStatus)}
            </p>
          </div>
          <div>
            <p className="text-ink/60">Current Balance</p>
            <p className="text-base font-semibold text-ink">
              {formatCurrency(currentBalance, { locale: "en-NG", currency: "NGN" })}
            </p>
          </div>
          <div>
            <p className="text-ink/60">Projected Balance</p>
            <p className="text-base font-semibold text-ink">
              {formatCurrency(projectedBalance, { locale: "en-NG", currency: "NGN" })}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SafeToSpendWidget;
