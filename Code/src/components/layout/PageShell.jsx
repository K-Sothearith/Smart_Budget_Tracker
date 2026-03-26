import Sidebar from './Sidebar'

function PageShell({ children, theme, onToggleTheme, onSignOut, profile, summary }) {
  return (
    <div className={`app-shell theme-${theme}`}>
      <Sidebar theme={theme} onToggleTheme={onToggleTheme} onSignOut={onSignOut} profile={profile} summary={summary} />
      <main className="page-content">{children}</main>
    </div>
  )
}

export default PageShell
