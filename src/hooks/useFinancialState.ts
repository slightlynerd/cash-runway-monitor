import { useCallback, useEffect, useMemo, useState } from "react";
import type {
  Expense,
  FinancialState,
  FinancialSummary,
  NewExpenseInput,
  RunwayStatus
} from "../types/financial";
import { normalizeMoney } from "../utils/money";

const STORAGE_KEY = "cash-runway-financial-state";

const defaultState: FinancialState = {
  currentBalance: 40000,
  monthlyRevenue: 18000,
  expenses: [
    { id: "ex-1", description: "Payroll", amount: 11500, type: "fixed" },
    { id: "ex-2", description: "Office + Utilities", amount: 2800, type: "fixed" },
    { id: "ex-3", description: "Performance Marketing", amount: 2400, type: "variable" }
  ]
};

const computeSummary = (state: FinancialState): FinancialSummary => {
  const totalMonthlyExpenses = state.expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const netMonthlyCashFlow = state.monthlyRevenue - totalMonthlyExpenses;

  let runwayMonths: number | null = null;
  let runwayStatus: RunwayStatus = "stable";

  if (state.currentBalance <= 0) {
    runwayMonths = 0;
    runwayStatus = "depleted";
  } else if (netMonthlyCashFlow < 0) {
    runwayMonths = state.currentBalance / Math.abs(netMonthlyCashFlow);
    runwayStatus = "finite";
  }

  return {
    totalMonthlyExpenses,
    netMonthlyCashFlow,
    runwayMonths,
    runwayStatus
  };
};

const parseStoredState = (): FinancialState => {
  if (typeof window === "undefined") {
    return defaultState;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultState;
  }

  try {
    const parsed = JSON.parse(raw) as FinancialState;

    return {
      currentBalance: normalizeMoney(parsed.currentBalance),
      monthlyRevenue: normalizeMoney(parsed.monthlyRevenue),
      expenses: Array.isArray(parsed.expenses)
        ? parsed.expenses
            .filter((expense): expense is Expense => {
              return (
                typeof expense?.id === "string" &&
                typeof expense.description === "string" &&
                (expense.type === "fixed" || expense.type === "variable") &&
                Number.isFinite(expense.amount)
              );
            })
            .map((expense) => ({
              ...expense,
              amount: normalizeMoney(expense.amount)
            }))
        : []
    };
  } catch {
    return defaultState;
  }
};

export const useFinancialState = () => {
  const [state, setState] = useState<FinancialState>(parseStoredState);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const summary = useMemo(() => computeSummary(state), [state]);

  const setCurrentBalance = useCallback((value: number) => {
    setState((previous) => ({
      ...previous,
      currentBalance: normalizeMoney(value)
    }));
  }, []);

  const setMonthlyRevenue = useCallback((value: number) => {
    setState((previous) => ({
      ...previous,
      monthlyRevenue: normalizeMoney(value)
    }));
  }, []);

  const addExpense = useCallback((input: NewExpenseInput) => {
    const normalizedAmount = normalizeMoney(input.amount);
    if (!input.description.trim() || normalizedAmount <= 0) {
      return;
    }

    const newExpense: Expense = {
      id: crypto.randomUUID(),
      description: input.description.trim(),
      amount: normalizedAmount,
      type: input.type
    };

    setState((previous) => ({
      ...previous,
      expenses: [newExpense, ...previous.expenses]
    }));
  }, []);

  const removeExpense = useCallback((id: string) => {
    setState((previous) => ({
      ...previous,
      expenses: previous.expenses.filter((expense) => expense.id !== id)
    }));
  }, []);

  const simulateRunway = useCallback(
    (oneTimeExpense: number): FinancialSummary => {
      const adjustedState: FinancialState = {
        ...state,
        currentBalance: normalizeMoney(
          state.currentBalance - normalizeMoney(oneTimeExpense)
        )
      };

      return computeSummary(adjustedState);
    },
    [state]
  );

  return {
    state,
    summary,
    setCurrentBalance,
    setMonthlyRevenue,
    addExpense,
    removeExpense,
    simulateRunway
  };
};
