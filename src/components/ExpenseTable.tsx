import type { Expense } from "../types/financial";
import Button from "./ui/Button";

interface ExpenseTableProps {
  expenses: Expense[];
  onRemoveExpense: (id: string) => void;
}

const ExpenseTable = ({ expenses, onRemoveExpense }: ExpenseTableProps) => {
  return (
    <div className="overflow-x-auto rounded-xl border border-ink/10">
      <table className="min-w-full divide-y divide-ink/10 text-sm">
        <thead className="bg-sand/75 text-left text-ink/70">
          <tr>
            <th className="px-4 py-3 font-semibold">Name</th>
            <th className="px-4 py-3 font-semibold">Type</th>
            <th className="px-4 py-3 font-semibold">Monthly</th>
            <th className="px-4 py-3 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink/10 bg-white/70">
          {expenses.length === 0 && (
            <tr>
              <td className="px-4 py-4 text-ink/60" colSpan={4}>
                No expenses yet. Add one to see your runway update.
              </td>
            </tr>
          )}
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="px-4 py-3 font-medium text-ink">{expense.description}</td>
              <td className="px-4 py-3 capitalize text-ink/70">{expense.type}</td>
              <td className="px-4 py-3 text-ink">
                {new Intl.NumberFormat("en-NG", {
                  style: "currency",
                  currency: "NGN",
                  maximumFractionDigits: 0
                }).format(expense.amount)}
              </td>
              <td className="px-4 py-3">
                <Button
                  variant="danger"
                  onClick={() => onRemoveExpense(expense.id)}
                  aria-label={`Delete ${expense.description}`}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseTable;
