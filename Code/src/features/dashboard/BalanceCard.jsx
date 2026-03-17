import { formatCurrency } from '../../utils/currency'
import Card from '../../components/ui/Card'

function BalanceCard({ balance = 0 }) {
  return (
    <Card className="balance-card">
      <h3>Balance</h3>
      <p>{formatCurrency(balance)}</p>
    </Card>
  )
}

export default BalanceCard
