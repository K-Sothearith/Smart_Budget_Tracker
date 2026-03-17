import ProgressBar from '../../components/ui/ProgressBar'
import Card from '../../components/ui/Card'

function SavingsCard({ saved = 0, goal = 0 }) {
  return (
    <Card className="savings-card">
      <h3>Savings Goal</h3>
      <ProgressBar value={saved} max={goal || 1} />
      <p>
        Saved {saved} / {goal}
      </p>
    </Card>
  )
}

export default SavingsCard
