import ProgressBar from '../../components/ui/ProgressBar'
import Card from '../../components/ui/Card'

function BudgetCard({ spent = 0, budget = 0 }) {
  return (
    <Card className="budget-card">
      <h3>Monthly Budget</h3>
      <ProgressBar value={spent} max={budget || 1} />
      <p>
        Spent {spent} / {budget}
      </p>
    </Card>
  )
}

export default BudgetCard
