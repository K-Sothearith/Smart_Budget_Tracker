import { categories } from '../../data/categories'
import Button from '../../components/ui/Button'

function AddTransactionForm({ onAdd }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    if (onAdd) onAdd({})
  }

  return (
    <form className="add-transaction" onSubmit={handleSubmit}>
      <label>
        Amount
        <input type="number" name="amount" min="0" step="0.01" />
      </label>
      <label>
        Type
        <select name="type" defaultValue="expense">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>
      <label>
        Category
        <select name="category" defaultValue="">
          <option value="">Select</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>
        Date
        <input type="date" name="date" />
      </label>
      <Button type="submit">Add Transaction</Button>
    </form>
  )
}

export default AddTransactionForm
