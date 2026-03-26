import { formatCurrency } from '../../utils/currency'

const navItems = ['Overview', 'Charts', 'Records']

function Sidebar({ theme, onToggleTheme, onSignOut, profile, summary }) {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <p className="eyebrow">Smart Budget</p>
        <h2>{profile.name}&apos;s dashboard</h2>
        <p>Account access now lives on main while the transaction storage logic stays local and lightweight.</p>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item, index) => (
          <button key={item} type="button" className={`sidebar__link ${index === 0 ? 'is-active' : ''}`}>
            {item}
          </button>
        ))}
      </nav>

      <div className="sidebar__summary">
        <div>
          <span>Balance</span>
          <strong>{formatCurrency(summary.balance)}</strong>
        </div>
        <div>
          <span>Expenses</span>
          <strong>{formatCurrency(summary.expense)}</strong>
        </div>
      </div>

      <button type="button" className="theme-switch" onClick={onToggleTheme}>
        Switch to {theme === 'dark' ? 'light' : 'dark'} mode
      </button>
      <button type="button" className="secondary-button" onClick={onSignOut}>
        Sign out
      </button>
    </aside>
  )
}

export default Sidebar
