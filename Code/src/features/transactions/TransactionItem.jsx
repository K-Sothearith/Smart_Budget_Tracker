import { formatCurrency } from '../../utils/currency'

function TransactionItem({ item }) {
  if (!item) return null

  return (
    <li className="transaction-item">
      <span>{item.category}</span>
      <span>{formatCurrency(item.amount)}</span>
    </li>
  )
}

export default TransactionItem
