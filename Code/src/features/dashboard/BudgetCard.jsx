import ProgressBar from '../../components/ui/ProgressBar'
import Card from '../../components/ui/Card'
import { formatCurrency } from '../../utils/currency'

function BudgetCard({ summary }) {
  return (
    <Card className="metric-card metric-card--budget">
      <span className="metric-label">Spending snapshot</span>
      <strong>{formatCurrency(summary.monthlyExpense)}</strong>
      <ProgressBar value={summary.monthlyExpense} max={summary.monthlyBudget || 1} />
      <p>
        {formatCurrency(summary.monthlyExpense)} spent in {summary.currentMonthLabel}
      </p>
    </Card>
  )
}

export default BudgetCard
