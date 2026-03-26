import { useState } from 'react'
import Button from '../../components/ui/Button'
import AuthShell from './AuthShell'

function Signup({ authApp, onSwitchToSignIn }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passkey: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    authApp.signUp(formData)
  }

  return (
    <AuthShell
      theme={authApp.theme}
      onToggleTheme={authApp.toggleTheme}
      title="Set up your budget workspace"
      subtitle="Create your account first, then your budget dashboard and transaction history stay saved on this device."
      features={[
        'Account details stored in local storage',
        'You will sign in again whenever you return',
        'Theme preference carries into the dashboard UI',
      ]}
      themeLabel="Starting theme"
    >
      <form className="onboarding-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Full name
            <input name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              minLength={6}
              title="At least 6 characters with uppercase, lowercase, number, and special character"
              required
            />
          </label>
          <label>
            Passkey
            <input
              type="password"
              inputMode="numeric"
              name="passkey"
              value={formData.passkey}
              onChange={handleChange}
              placeholder="4 to 6 digits"
              pattern="\d{4,6}"
              minLength={4}
              maxLength={6}
              title="Passkey must be 4 to 6 digits only, and contains only numbers"
              required
            />
          </label>
        </div>

        {authApp.onboardingFeedback ? <p className="form-feedback">{authApp.onboardingFeedback}</p> : null}

        <div className="onboarding-actions">
          <Button className="primary-button primary-button--compact" type="submit">
            Launch budget dashboard
          </Button>
          <button type="button" className="auth-link" onClick={onSwitchToSignIn}>
            Already have an account? Sign in
          </button>
        </div>
      </form>
    </AuthShell>
  )
}

export default Signup
