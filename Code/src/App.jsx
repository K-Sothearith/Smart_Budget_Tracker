import { useState } from 'react'
import PageShell from './components/layout/PageShell'
import Dashboard from './features/dashboard/Dashboard'
import AddTransactionForm from './features/transactions/AddTransactionForm'
import TransactionList from './features/dashboard/TransactionList'
import Card from './components/ui/Card'
import Button from './components/ui/Button'
import ProgressBar from './components/ui/ProgressBar'
import { useBudgetApp } from './hooks/useBudgetApp'
import { formatCurrency } from './utils/currency'

function App() {
  const budgetApp = useBudgetApp()

  if (!budgetApp.profile.isOnboarded) {
    return <OnboardingFlow budgetApp={budgetApp} />
  }

  return (
    <>
      <PageShell
        activeView={budgetApp.activeView}
        onChangeView={budgetApp.setActiveView}
        profile={budgetApp.profile}
        theme={budgetApp.theme}
        onToggleTheme={budgetApp.toggleTheme}
        summary={budgetApp.summary}
      >
        <MainView budgetApp={budgetApp} />
      </PageShell>
      <PasskeyModal
        pendingAction={budgetApp.pendingAction}
        onCancel={budgetApp.cancelPendingAction}
        onConfirm={budgetApp.confirmPendingAction}
      />
    </>
  )
}

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

function OnboardingFlow({ budgetApp }) {
  const [formData, setFormData] = useState({
    name: '',
    currency: 'USD',
    monthlyBudget: '',
    initialBalance: '',
    initialSavings: '',
    passkey: '',
    goalName: 'Emergency Fund',
    goalTarget: '',
    theme: 'light',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    budgetApp.completeOnboarding(formData)
  }

  return (
    <div className={`onboarding-shell theme-${formData.theme}`}>
      <section className="onboarding-panel">
        <div className="onboarding-copy">
          <p className="eyebrow">Smart Budget Tracker</p>
          <h1>Set up your budget workspace.</h1>
          <p>
            We&apos;ll save your monthly budget, opening balances, savings goal, and passkey in localStorage so the app
            behaves like your Java tracker from the first session.
          </p>
          <ul className="feature-list">
            <li>Monthly budget tracking instead of lifetime spend</li>
            <li>Passkey confirmation for expenses and savings withdrawals</li>
            <li>Persistent data, theme preference, and savings progress</li>
          </ul>
        </div>

        <form className="onboarding-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Your name
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Sokha" required />
            </label>
            <label>
              Currency
              <select name="currency" value={formData.currency} onChange={handleChange}>
                <option value="USD">USD</option>
                <option value="KHR">KHR</option>
                <option value="EUR">EUR</option>
              </select>
            </label>
            <label>
              Monthly budget
              <input
                type="number"
                min="0"
                step="0.01"
                name="monthlyBudget"
                value={formData.monthlyBudget}
                onChange={handleChange}
                placeholder="800"
                required
              />
            </label>
            <label>
              Opening balance
              <input
                type="number"
                min="0"
                step="0.01"
                name="initialBalance"
                value={formData.initialBalance}
                onChange={handleChange}
                placeholder="2500"
                required
              />
            </label>
            <label>
              Opening savings
              <input
                type="number"
                min="0"
                step="0.01"
                name="initialSavings"
                value={formData.initialSavings}
                onChange={handleChange}
                placeholder="500"
              />
            </label>
            <label>
              Passkey
              <input
                type="password"
                name="passkey"
                value={formData.passkey}
                onChange={handleChange}
                placeholder="4 to 8 digits"
                minLength={4}
                maxLength={8}
                required
              />
            </label>
            <label>
              First savings goal
              <input
                name="goalName"
                value={formData.goalName}
                onChange={handleChange}
                placeholder="Emergency Fund"
              />
            </label>
            <label>
              Goal target
              <input
                type="number"
                min="0"
                step="0.01"
                name="goalTarget"
                value={formData.goalTarget}
                onChange={handleChange}
                placeholder="1500"
              />
            </label>
          </div>

          <div className="theme-picker">
            <span>Starting theme</span>
            <div className="toggle-row">
              <button
                type="button"
                className={formData.theme === 'light' ? 'is-active' : ''}
                onClick={() => setFormData((prev) => ({ ...prev, theme: 'light' }))}
              >
                Light
              </button>
              <button
                type="button"
                className={formData.theme === 'dark' ? 'is-active' : ''}
                onClick={() => setFormData((prev) => ({ ...prev, theme: 'dark' }))}
              >
                Dark
              </button>
            </div>
          </div>

          {budgetApp.onboardingFeedback ? <p className="form-feedback">{budgetApp.onboardingFeedback}</p> : null}

          <Button className="primary-button" type="submit">
            Launch budget dashboard
          </Button>
        </form>
      </section>
    </div>
  )
}

function SavingsGoalsPanel({ goals, savingsBalance, currency, onAddGoal }) {
  const [goalForm, setGoalForm] = useState({ name: '', target: '' })

  const handleSubmit = (event) => {
    event.preventDefault()
    onAddGoal(goalForm)
    setGoalForm({ name: '', target: '' })
  }

  return (
    <Card className="goals-card">
      <div className="section-heading">
        <div>
          <h2>Savings goals</h2>
          <p>Each goal compares against the total savings you currently hold.</p>
        </div>
      </div>

      <form className="inline-form" onSubmit={handleSubmit}>
        <input
          placeholder="Goal name"
          value={goalForm.name}
          onChange={(event) => setGoalForm((prev) => ({ ...prev, name: event.target.value }))}
        />
        <input
          type="number"
          min="0"
          step="0.01"
          placeholder="Target"
          value={goalForm.target}
          onChange={(event) => setGoalForm((prev) => ({ ...prev, target: event.target.value }))}
        />
        <Button className="primary-button" type="submit">
          Add goal
        </Button>
      </form>

      <div className="goal-list">
        {goals.length ? (
          goals.map((goal) => (
            <article className="goal-item" key={goal.id}>
              <div className="goal-item__header">
                <strong>{goal.name}</strong>
                <span>{formatCurrency(goal.target, currency)}</span>
              </div>
              <ProgressBar value={savingsBalance} max={goal.target || 1} />
              <p>
                {formatCurrency(savingsBalance, currency)} saved toward {goal.name}
              </p>
            </article>
          ))
        ) : (
          <p className="empty-state">No goals yet. Add one to track savings progress.</p>
        )}
      </div>
    </Card>
  )
}

function SettingsView({ profile, theme, feedback, onSave, onToggleTheme, onReset }) {
  const [formData, setFormData] = useState({
    name: profile.name,
    currency: profile.currency,
    monthlyBudget: profile.monthlyBudget,
    passkey: profile.passkey,
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave(formData)
  }

  return (
    <div className="content-grid">
      <Card>
        <div className="section-heading">
          <div>
            <h2>Account settings</h2>
            <p>Changes save directly to localStorage.</p>
          </div>
        </div>

        <form className="settings-form" onSubmit={handleSubmit}>
          <label>
            Name
            <input name="name" value={formData.name} onChange={handleChange} />
          </label>
          <label>
            Currency
            <select name="currency" value={formData.currency} onChange={handleChange}>
              <option value="USD">USD</option>
              <option value="KHR">KHR</option>
              <option value="EUR">EUR</option>
            </select>
          </label>
          <label>
            Monthly budget
            <input
              type="number"
              min="0"
              step="0.01"
              name="monthlyBudget"
              value={formData.monthlyBudget}
              onChange={handleChange}
            />
          </label>
          <label>
            Passkey
            <input
              type="password"
              minLength={4}
              maxLength={8}
              name="passkey"
              value={formData.passkey}
              onChange={handleChange}
            />
          </label>

          {feedback ? <p className="form-feedback">{feedback}</p> : null}

          <Button className="primary-button" type="submit">
            Save changes
          </Button>
        </form>
      </Card>

      <Card>
        <div className="section-heading">
          <div>
            <h2>Appearance and reset</h2>
            <p>Theme changes apply immediately across the workspace.</p>
          </div>
        </div>

        <div className="settings-actions">
          <div className="settings-row">
            <div>
              <strong>Current theme</strong>
              <p>{theme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled'}</p>
            </div>
            <Button className="secondary-button" onClick={onToggleTheme}>
              Toggle theme
            </Button>
          </div>
          <div className="settings-row danger-zone">
            <div>
              <strong>Reset all local data</strong>
              <p>This clears onboarding, transactions, goals, and preferences.</p>
            </div>
            <Button className="danger-button" onClick={onReset}>
              Reset app
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

function PasskeyModal({ pendingAction, onCancel, onConfirm }) {
  const [passkey, setPasskey] = useState('')

  if (!pendingAction) return null

  const handleSubmit = (event) => {
    event.preventDefault()
    onConfirm(passkey)
    setPasskey('')
  }

  const handleClose = () => {
    setPasskey('')
    onCancel()
  }

  return (
    <div className="modal-backdrop">
      <section className="modal-card">
        <p className="eyebrow">Passkey required</p>
        <h2>Confirm sensitive action</h2>
        <p>{pendingAction.message}</p>
        <form onSubmit={handleSubmit}>
          <label>
            Enter passkey
            <input
              autoFocus
              type="password"
              value={passkey}
              onChange={(event) => setPasskey(event.target.value)}
              placeholder="Passkey"
            />
          </label>
          {pendingAction.error ? <p className="form-feedback">{pendingAction.error}</p> : null}
          <div className="modal-actions">
            <Button className="secondary-button" type="button" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="primary-button" type="submit">
              Confirm
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default App
