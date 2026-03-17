import { categories } from '../../data/categories'

function TransactionFilters() {
  return (
    <div className="transaction-filters">
      <label>
        Category
        <select defaultValue="">
          <option value="">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default TransactionFilters
