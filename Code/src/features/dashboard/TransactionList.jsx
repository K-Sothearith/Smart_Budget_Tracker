import TransactionItem from '../transactions/TransactionItem'
import TransactionFilters from '../transactions/TransactionFilters'

function TransactionList({ transactions = [] }) {
  return (
    <section className="transaction-list">
      <h3>Recent Transactions</h3>
      <TransactionFilters />
      <ul>
        {transactions.map((item) => (
          <TransactionItem key={item.id} item={item} />
        ))}
      </ul>
    </section>
  )
}

export default TransactionList
