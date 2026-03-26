import { useState } from 'react'
import Button from '../../components/ui/Button'
import AuthShell from './AuthShell'

function Signin({ authApp, onSwitchToSignUp }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    authApp.signIn(credentials)
  }

  return (
    <AuthShell
      theme={authApp.theme}
      onToggleTheme={authApp.toggleTheme}
      title="Welcome back"
      subtitle="Sign in with the account stored on this device to open your saved dashboard with the same UI and transaction data."
      features={[
        'Transactions remain in local storage after sign out',
        'Returning visits require sign in again',
        'Theme changes here immediately match the dashboard',
      ]}
    >
      <form className="onboarding-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Email
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              minLength={6}
              required
            />
            {authApp.authFeedback ? <p className="form-feedback">{authApp.authFeedback}</p> : null}
          </label>
        </div>

        <div className="onboarding-actions">
          <Button className="primary-button primary-button--compact" type="submit">
            Sign in
          </Button>
          <button type="button" className="auth-link" style={{ marginTop: '-3rem' }} onClick={onSwitchToSignUp}>
            Need an account? Create one
          </button>
          <button type="button" className="auth-link" style={{ marginTop: '-3rem' }} onClick={authApp.resetAllData}>
            Clear local data
          </button>
        </div>
      </form>
    </AuthShell>
  )
}

export default Signin
