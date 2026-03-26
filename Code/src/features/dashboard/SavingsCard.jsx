import ProgressBar from '../../components/ui/ProgressBar'
import Card from '../../components/ui/Card'
import { formatCurrency } from '../../utils/currency'

function SavingsCard({ summary }) {
  return (
    <Card className="metric-card metric-card--savings">
      <span className="metric-label">Records tracked</span>
      <strong>{summary.transactionCount}</strong>
      <ProgressBar value={summary.expense} max={summary.income || 1} />
      <p>
        Expense coverage at {formatCurrency(summary.expense)} against {formatCurrency(summary.income)} income
      </p>
    </Card>
  )
}

export default SavingsCard
