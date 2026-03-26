import { formatCurrency } from '../../utils/currency'
import Card from '../../components/ui/Card'

function BalanceCard({ summary }) {
  return (
    <Card className="metric-card metric-card--balance">
      <span className="metric-label">Available balance</span>
      <strong>{formatCurrency(summary.balance)}</strong>
      <p>
        Income {formatCurrency(summary.income)} vs expenses {formatCurrency(summary.expense)}
      </p>
    </Card>
  )
}

export default BalanceCard
