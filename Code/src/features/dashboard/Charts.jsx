import Card from '../../components/ui/Card'
import { formatCurrency } from '../../utils/currency'

function Charts({ summary, currency }) {
  const items = [
    { label: 'Income', value: summary.totalIncome, tone: 'income' },
    { label: 'Expense', value: summary.totalExpense, tone: 'expense' },
    { label: 'Add Savings', value: summary.totalAddedToSavings, tone: 'savings' },
    { label: 'Use Savings', value: summary.totalUsedFromSavings, tone: 'withdrawal' },
  ]

  const max = Math.max(...items.map((item) => item.value), 1)

  return (
    <Card className="chart-card">
      <div className="section-heading">
        <div>
          <h2>Record mix</h2>
          <p>All record types from your Java project are included in the balance model.</p>
        </div>
      </div>

      <div className="chart-bars">
        {items.map((item) => (
          <div className="chart-row" key={item.label}>
            <div className="chart-row__meta">
              <span>{item.label}</span>
              <strong>{formatCurrency(item.value, currency)}</strong>
            </div>
            <div className="chart-track">
              <div
                className={`chart-fill chart-fill--${item.tone}`}
                style={{ width: `${Math.max((item.value / max) * 100, item.value ? 12 : 0)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default Charts
