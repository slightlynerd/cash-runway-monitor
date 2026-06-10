# Cash Runway & Safe-to-Spend Monitor

A modern React web application for financial planning and runway analysis. Monitor your cash position, calculate business runway, and make informed spending decisions.

## Features

- **Cash Runway Analysis**: Calculate how many months your current balance can sustain your business based on monthly expenses
- **Safe-to-Spend Calculator**: Simulate one-time expenses and see the impact on your runway in real-time
- **Expense Tracking**: Manage fixed and variable recurring expenses
- **Financial Dashboard**: Real-time view of your financial metrics including balance, cash flow, and runway status
- **Local Data Persistence**: All data is stored locally in browser storage—no server required
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend Framework**: React 18.3.1 with TypeScript 5.5.4
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.10
- **Type Safety**: Strict TypeScript configuration
- **Package Manager**: npm

### Design System

- **Colors**: Custom theme with Ink (#1f2937), Mint (#34D399), Coral (#FB7185), Sand (#F6F1E9)
- **Typography**: Plus Jakarta Sans (body), Space Grotesk (headings) via Google Fonts
- **Spacing & Effects**: Custom shadow system for elevated UI elements

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 9+

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/           # React components
│   ├── ui/              # Reusable UI primitives (Card, Button, Input)
│   ├── ExpenseManager.tsx          # Expense input and list management
│   ├── ExpenseManagerForm.tsx       # Form for adding expenses
│   ├── ExpenseTable.tsx            # Table display of expenses
│   ├── FinancialForm.tsx           # Input for balance and revenue
│   ├── MetricCard.tsx              # Financial metric display
│   ├── RunwayDashboard.tsx         # Main orchestrator component
│   └── SafeToSpendWidget.tsx       # Scenario calculator
├── hooks/
│   └── useFinancialState.ts        # Central state management hook
├── utils/
│   ├── formatters.ts              # Currency and runway formatting
│   └── money.ts                   # Money parsing and validation
├── types/
│   └── financial.ts               # TypeScript type definitions
├── App.tsx                        # Root component
└── main.tsx                       # Entry point
```

## How to Use

### 1. Set Your Starting Position
Enter your current cash balance and monthly revenue in the **Financial Form**

### 2. Add Expenses
Create fixed (rent, salaries) and variable (supplies, marketing) expenses. Each expense represents a monthly burn rate.

### 3. Check Your Runway
The dashboard shows:
- **Total Monthly Expenses**: Sum of all recurring expenses
- **Net Monthly Cash Flow**: Revenue minus expenses
- **Runway Status**: How many months your balance sustains operations

### 4. Test Scenarios
Use the **Safe-to-Spend Widget** to simulate one-time expenses and see the impact on your runway and balance.

## Key Concepts

### Runway
The number of months your current cash balance can cover your burn rate (monthly expenses). Calculated as:
```
Runway (months) = Current Balance ÷ Net Monthly Burn
```

A negative runway (spending more than earning) shows as "0 months" or indicates you need to increase revenue or cut expenses.

### Safe-to-Spend
A scenario calculator that helps you answer: "Can I afford this expense right now?" It shows:
- **Current Runway**: Your baseline
- **Projected Runway**: After the hypothetical expense
- **Current Balance**: Today's balance
- **Projected Balance**: After the expense

## Development

### Available Scripts

```bash
npm run dev       # Start dev server with hot reload
npm run build     # Compile TypeScript and build with Vite
npm run preview   # Preview production build locally
npm run lint      # Run ESLint (if configured)
```

### Type Checking

The project uses strict TypeScript configuration. All components are fully typed and no unused variables are allowed.

## Architecture

### State Management
The `useFinancialState` hook handles:
- Current balance, monthly revenue, expense list
- Computed summaries (total expenses, cash flow, runway)
- localStorage persistence and hydration
- Memoized calculations for performance

### Component Composition
- **Smart Components**: RunwayDashboard orchestrates data flow
- **Presentational Components**: MetricCard, ExpenseTable display data
- **Form Components**: FinancialForm, ExpenseManager handle input
- **UI Primitives**: Reusable Card, Button, Input components

### Utilities
- `formatters.ts`: Currency and runway display formatting (NGN by default)
- `money.ts`: Input parsing and validation with numeric safeguards

## Browser Support

Works on all modern browsers (Chrome, Firefox, Safari, Edge) that support ES2020+ JavaScript.

## Data

All data is stored locally in your browser's localStorage. No data is sent to servers. Data persists across sessions and browser restarts.

## Future Enhancements

- Data export (CSV, JSON)
- Multi-currency support
- Expense forecasting
- Revenue planning tools
- Analytics dashboard

## License

MIT

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.
