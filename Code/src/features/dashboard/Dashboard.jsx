import BalanceCard from './BalanceCard'
import BudgetCard from './BudgetCard'
import SavingsCard from './SavingsCard'
import Charts from './Charts'
import TransactionList from './TransactionList'
import AddTransactionForm from '../transactions/AddTransactionForm'
import Button from '../../components/ui/Button'

function Dashboard({ summary, transactions, onAddTransaction }) {

  return (
    <section className="dashboard">
      <header className="section-header">
        <div>
          <p className="eyebrow">Overview</p>
          <h1>Budget command center</h1>
          <p>Track balance, spending, charts, and records with the upgraded main-branch interface.</p>
        </div>
        <Button className="primary-button" onClick={() => document.getElementById('add-record-form')?.scrollIntoView({ behavior: 'smooth' })}>
          Add transaction
        </Button>
      </header>

      <div className="dashboard__cards">
        <BalanceCard summary={summary} />
        <BudgetCard summary={summary} />
        <SavingsCard summary={summary} />
      </div>

      <div className="content-grid">
        <Charts summary={summary} />
        <TransactionList transactions={transactions} />
      </div>

      <section className="view-section" id="add-record-form">
        <header className="section-header">
          <div>
            <p className="eyebrow">Create Record</p>
            <h1>Add a transaction</h1>
            <p>Current data parsing and local-storage behavior on `main` stay exactly as they were.</p>
          </div>
        </header>
        <AddTransactionForm onAdd={onAddTransaction} />
      </section>
    </section>
  )
}

export default Dashboard
