import Card from '../../components/ui/Card'
import AddTransactionForm from '../transactions/AddTransactionForm'
import Dashboard from '../dashboard/Dashboard'
import TransactionList from '../dashboard/TransactionList'
import SavingsGoalsPanel from '../dashboard/SavingsGoalsPanel'
import SettingsView from '../settings/SettingsView'
import { formatCurrency } from '../../utils/currency'

function MainView({ budgetApp }) {
  const {
    activeView,
    filters,
    filteredTransactions,
    summary,
    transactionFeedback,
    submitTransaction,
    updateFilter,
    clearFilters,
    addSavingsGoal,
    settingsFeedback,
    updateSettings,
    resetAllData,
    profile,
  } = budgetApp

  if (activeView === 'add') {
    return (
      <section className="view-section">
        <header className="section-header">
          <div>
            <p className="eyebrow">Create Record</p>
            <h1>Add a transaction</h1>
            <p>Income, expense, add savings, and use savings all feed the same real balance model.</p>
          </div>
        </header>
        <AddTransactionForm
          onSubmit={submitTransaction}
          feedback={transactionFeedback}
          categories={budgetApp.categories}
        />
      </section>
    )
  }

  if (activeView === 'transactions') {
    return (
      <section className="view-section">
        <header className="section-header">
          <div>
            <p className="eyebrow">Records</p>
            <h1>Transaction history</h1>
            <p>Filters are live, and the list stays view-only exactly as requested.</p>
          </div>
        </header>
        <TransactionList
          transactions={filteredTransactions}
          filters={filters}
          onFilterChange={updateFilter}
          onClearFilters={clearFilters}
          categories={budgetApp.categories}
          fullWidth
        />
      </section>
    )
  }

  if (activeView === 'savings') {
    return (
      <section className="view-section">
        <header className="section-header">
          <div>
            <p className="eyebrow">Savings</p>
            <h1>Savings goals and transfers</h1>
            <p>Progress uses your current savings balance, while transfers stay recorded in the transaction history.</p>
          </div>
        </header>
        <div className="content-grid">
          <Card className="spotlight-card">
            <span className="metric-label">Savings balance</span>
            <strong>{formatCurrency(summary.savingsBalance, profile.currency)}</strong>
            <p>{summary.goalCount} active goals tracked with localStorage persistence.</p>
          </Card>
          <SavingsGoalsPanel
            goals={budgetApp.savingsGoals}
            savingsBalance={summary.savingsBalance}
            currency={profile.currency}
            onAddGoal={addSavingsGoal}
          />
        </div>
      </section>
    )
  }

  if (activeView === 'settings') {
    return (
      <section className="view-section">
        <header className="section-header">
          <div>
            <p className="eyebrow">Settings</p>
            <h1>Profile and security</h1>
            <p>Update your monthly budget, appearance, and passkey without leaving the app.</p>
          </div>
        </header>
        <SettingsView
          profile={profile}
          theme={budgetApp.theme}
          feedback={settingsFeedback}
          onSave={updateSettings}
          onToggleTheme={budgetApp.toggleTheme}
          onReset={resetAllData}
        />
      </section>
    )
  }

  return (
    <Dashboard
      summary={summary}
      filters={filters}
      transactions={filteredTransactions}
      categories={budgetApp.categories}
      onFilterChange={updateFilter}
      onClearFilters={clearFilters}
      onQuickAdd={budgetApp.setActiveView}
      currency={profile.currency}
      feedback={transactionFeedback}
    />
  )
}

export default MainView
