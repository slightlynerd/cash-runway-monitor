import FinancialForm from "./FinancialForm";
import ExpenseManager from "./ExpenseManager";
import MetricCard from "./MetricCard";
import SafeToSpendWidget from "./SafeToSpendWidget";
import { useFinancialState } from "../hooks/useFinancialState";
import { formatCurrency, formatRunway } from "../utils/formatters";

const RunwayDashboard = () => {
  const {
    state,
    summary,
    setCurrentBalance,
    setMonthlyRevenue,
    addExpense,
    removeExpense,
    simulateRunway
  } = useFinancialState();

  return (
    <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <header className="space-y-2">
        <p className="inline-flex rounded-full bg-ink px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Financial Control Center
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Cash Runway and Safe-to-Spend Monitor
        </h1>
        <p className="max-w-2xl text-sm text-ink/70 sm:text-base">
          Understand monthly burn, monitor runway health, and evaluate one-time expenses before committing.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard
          label="Total Monthly Expenses"
          value={formatCurrency(summary.totalMonthlyExpenses)}
          description="Your recurring monthly obligations from fixed and variable costs."
          tone="neutral"
        />
        <MetricCard
          label="Net Monthly Cash Flow"
          value={formatCurrency(summary.netMonthlyCashFlow)}
          description="Revenue minus expenses. Negative indicates burn."
          tone={summary.netMonthlyCashFlow < 0 ? "negative" : "positive"}
        />
        <MetricCard
          label="Cash Runway"
          value={formatRunway(summary.runwayMonths, summary.runwayStatus)}
          description="How long your cash lasts based on current burn."
          tone={summary.runwayStatus === "stable" ? "positive" : "negative"}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.15fr_1fr]">
        <div className="space-y-4">
          <FinancialForm
            currentBalance={state.currentBalance}
            monthlyRevenue={state.monthlyRevenue}
            onCurrentBalanceChange={setCurrentBalance}
            onMonthlyRevenueChange={setMonthlyRevenue}
          />
          <SafeToSpendWidget
            currentBalance={state.currentBalance}
            currentSummary={summary}
            onSimulate={simulateRunway}
          />
        </div>

        <ExpenseManager
          expenses={state.expenses}
          onAddExpense={addExpense}
          onRemoveExpense={removeExpense}
        />
      </section>
    </main>
  );
};

export default RunwayDashboard;
