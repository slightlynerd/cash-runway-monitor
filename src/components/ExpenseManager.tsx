import { useState } from "react";
import type { Expense, ExpenseType } from "../types/financial";
import { parseMoneyInput } from "../utils/money";
import Card from "./ui/Card";
import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";

interface ExpenseManagerProps {
  expenses: Expense[];
  onAddExpense: (expense: {
    description: string;
    amount: number;
    type: ExpenseType;
  }) => void;
  onRemoveExpense: (id: string) => void;
}

const ExpenseManager = ({
  expenses,
  onAddExpense,
  onRemoveExpense
}: ExpenseManagerProps) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<ExpenseType>("fixed");

  const parsedAmount = parseMoneyInput(amount);

  const canSubmit = description.trim().length > 0 && parsedAmount > 0;

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    onAddExpense({
      description,
      amount: parsedAmount,
      type
    });

    setDescription("");
    setAmount("");
    setType("fixed");
  };

  return (
    <Card
      title="Recurring Expenses"
      subtitle="Track both fixed and variable obligations."
      className="h-full"
    >
      <div className="space-y-5">
        <ExpenseForm
          description={description}
          amount={amount}
          type={type}
          onChangeDescription={setDescription}
          onChangeAmount={setAmount}
          onChangeType={setType}
          handleSubmit={handleSubmit}
        />

        <ExpenseTable expenses={expenses} onRemoveExpense={onRemoveExpense} />
      </div>
    </Card>
  );
};

export default ExpenseManager;
