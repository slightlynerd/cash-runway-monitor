import Button from "./ui/Button";
import Input from "./ui/Input";
import { ExpenseType } from "../types/financial";
import { parseMoneyInput } from "../utils/money";

interface ExpenseManagerFormProps {
  description: string;
  amount: string;
  type: ExpenseType;
  onChangeDescription: (description: string) => void;
  onChangeAmount: (amount: string) => void;
  onChangeType: (type: ExpenseType) => void;
  handleSubmit: () => void;
}

const ExpenseManagerForm = ({ 
  description, 
  amount, 
  type, 
  onChangeDescription, 
  onChangeAmount, 
  onChangeType, 
  handleSubmit }: ExpenseManagerFormProps) => {
  const parsedAmount = parseMoneyInput(amount);
  const canSubmit = description.trim().length > 0 && parsedAmount > 0;

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-[2fr_1fr_auto] sm:items-end">
        <Input
          id="expense-description"
          label="Expense Name"
          placeholder="Rent, payroll, subscriptions"
          value={description}
          onChange={(event) => onChangeDescription(event.target.value)}
        />
        <Input
          id="expense-amount"
          label="Amount"
          type="number"
          min={0}
          step="0.01"
          value={amount}
          onChange={(event) => onChangeAmount(event.target.value)}
        />
        <div className="flex h-full flex-col gap-2">
          <span className="text-sm font-medium text-ink">Type</span>
          <div className="flex rounded-xl border border-ink/15 p-1">
            <button
              type="button"
              onClick={() => onChangeType("fixed")}
              className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium ${
                type === "fixed" ? "bg-ink text-white" : "text-ink/70"
              }`}
            >
              Fixed
            </button>
            <button
              type="button"
              onClick={() => onChangeType("variable")}
              className={`flex-1 rounded-lg px-3 py-1.5 text-sm font-medium ${
                type === "variable" ? "bg-ink text-white" : "text-ink/70"
              }`}
            >
              Variable
            </button>
          </div>
        </div>
      </div>

      <Button variant="secondary" onClick={handleSubmit} disabled={!canSubmit}>
        Add Expense
      </Button>
    </>
  );
};

export default ExpenseManagerForm;
