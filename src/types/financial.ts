export type ExpenseType = "fixed" | "variable";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  type: ExpenseType;
}

export interface FinancialState {
  currentBalance: number;
  monthlyRevenue: number;
  expenses: Expense[];
}

export type RunwayStatus = "stable" | "finite" | "depleted";

export interface FinancialSummary {
  totalMonthlyExpenses: number;
  netMonthlyCashFlow: number;
  runwayMonths: number | null;
  runwayStatus: RunwayStatus;
}

export interface NewExpenseInput {
  description: string;
  amount: number;
  type: ExpenseType;
}
