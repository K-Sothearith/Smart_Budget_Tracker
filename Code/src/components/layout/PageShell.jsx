import Sidebar from './Sidebar'

function PageShell({ children }) {
  return (
    <div className="page-shell">
      <Sidebar />
      <main className="page-content">{children}</main>
    </div>
  )
}

export default PageShell
