import Sidebar from './Sidebar'

function PageShell({ children, theme, onToggleTheme, summary }) {
  return (
    <div className={`app-shell theme-${theme}`}>
      <Sidebar theme={theme} onToggleTheme={onToggleTheme} summary={summary} />
      <main className="page-content">{children}</main>
    </div>
  )
}

export default PageShell
