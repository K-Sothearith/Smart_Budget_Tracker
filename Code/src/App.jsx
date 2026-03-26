import { useEffect, useMemo, useState } from 'react'
import PageShell from './components/layout/PageShell'
import Dashboard from './features/dashboard/Dashboard'
import { useTransactions } from './hooks/useTransactions'

function App() {
  const [theme, setTheme] = useState('light')
  const { summary, transactions, addTransaction } = useTransactions()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const dashboardSummary = useMemo(
    () => ({
      balance: summary.balance,
      income: summary.income,
      expense: summary.expense,
      monthlyBudget: Math.max(summary.income, 1),
      monthlyExpense: summary.expense,
      currentMonthLabel: new Date().toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
      }),
      savingsBalance: 0,
      topGoalTarget: Math.max(summary.income, 1),
      goalCount: transactions.length,
      transactionCount: transactions.length,
    }),
    [summary, transactions.length],
  )

  return (
    <PageShell
      theme={theme}
      onToggleTheme={() => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))}
      summary={dashboardSummary}
    >
      <Dashboard summary={dashboardSummary} transactions={transactions} onAddTransaction={addTransaction} />
    </PageShell>
  )
}

export default App
