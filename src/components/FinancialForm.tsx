import Input from "./ui/Input";
import Card from "./ui/Card";
import { parseMoneyInput } from "../utils/money";

interface FinancialFormProps {
  currentBalance: number;
  monthlyRevenue: number;
  onCurrentBalanceChange: (value: number) => void;
  onMonthlyRevenueChange: (value: number) => void;
}

const FinancialForm = ({
  currentBalance,
  monthlyRevenue,
  onCurrentBalanceChange,
  onMonthlyRevenueChange
}: FinancialFormProps) => {
  return (
    <Card
      title="Core Financial Inputs"
      subtitle="Use monthly values to keep the runway estimate realistic."
    >
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
        <Input
          id="current-balance"
          label="Current Cash Balance"
          type="number"
          min={0}
          step="0.01"
          value={currentBalance}
          onChange={(event) => onCurrentBalanceChange(parseMoneyInput(event.target.value))}
          hint="Available cash in your bank accounts."
        />

        <Input
          id="monthly-revenue"
          label="Monthly Revenue"
          type="number"
          min={0}
          step="0.01"
          value={monthlyRevenue}
          onChange={(event) => onMonthlyRevenueChange(parseMoneyInput(event.target.value))}
          hint="Average revenue expected each month."
        />
      </form>
    </Card>
  );
};

export default FinancialForm;
