import { useState } from 'react'
import { categories } from '../../data/categories'
import Button from '../../components/ui/Button'

function AddTransactionForm({ onAdd }) {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'expense',
    category: categories[0] || 'Other',
    date: new Date().toISOString().slice(0, 10),
    note: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (onAdd) {
      onAdd(formData)
      setFormData((prev) => ({
        ...prev,
        amount: '',
        note: '',
        date: new Date().toISOString().slice(0, 10),
      }))
    }
  }

  return (
    <section className="form-card">
      <form className="add-transaction" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Amount
            <input
              type="number"
              name="amount"
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
            />
          </label>
          <label>
            Type
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>
          <label>
            Category
            <select name="category" value={formData.category} onChange={handleChange}>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
          <label>
            Date
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
          </label>
          <label className="form-grid__wide">
            Note
            <textarea
              rows="4"
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Optional note for this record"
            />
          </label>
        </div>

        <Button className="primary-button" type="submit">
          Save record
        </Button>
      </form>
    </section>
  )
}

export default AddTransactionForm
