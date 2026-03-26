import Card from '../../components/ui/Card'
import TransactionItem from '../transactions/TransactionItem'
import TransactionFilters from '../transactions/TransactionFilters'

function TransactionList({ transactions = [] }) {
  return (
    <Card className="transaction-panel">
      <div className="section-heading">
        <div>
          <h2>Transactions</h2>
          <p>Recent records from main-branch storage, shown with the imported UI.</p>
        </div>
      </div>
      <TransactionFilters />
      <ul className="transaction-list">
        {transactions.length ? transactions.map((item) => (
          <TransactionItem key={item.id} item={item} />
        )) : <li className="empty-state">No transactions yet. Add one below to populate the dashboard.</li>}
      </ul>
    </Card>
  )
}

export default TransactionList
