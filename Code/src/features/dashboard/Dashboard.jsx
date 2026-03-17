import BalanceCard from './BalanceCard'
import BudgetCard from './BudgetCard'
import SavingsCard from './SavingsCard'
import Charts from './Charts'
import TransactionList from './TransactionList'
import { useTransactions } from '../../hooks/useTransactions'

function Dashboard() {
  const { summary, transactions } = useTransactions()

  return (
    <section className="dashboard">
      <div className="dashboard__cards">
        <BalanceCard balance={summary.balance} />
        <BudgetCard spent={summary.expense} budget={0} />
        <SavingsCard saved={0} goal={0} />
      </div>
      <Charts />
      <TransactionList transactions={transactions} />
    </section>
  )
}

export default Dashboard
