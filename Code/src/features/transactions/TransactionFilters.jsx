import { categories } from '../../data/categories'

function TransactionFilters() {
  return (
    <div className="transaction-filters">
      <label>
        Search
        <input placeholder="UI preview only" disabled />
      </label>
      <label>
        Type
        <select defaultValue="all" disabled>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>
      <label>
        Category
        <select defaultValue="" disabled>
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label>
        Month
        <input type="month" disabled />
      </label>
    </div>
  )
}

export default TransactionFilters
