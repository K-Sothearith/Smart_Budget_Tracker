import { useEffect, useMemo, useState } from 'react'
import PageShell from './components/layout/PageShell'
import Dashboard from './features/dashboard/Dashboard'
import Signin from './features/auth/Signin'
import Signup from './features/auth/Signup'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useTransactions } from './hooks/useTransactions'
import { isValidPasskey, isValidPassword } from './utils/data'

const ACCOUNT_STORAGE_KEY = 'sbt.account'
const THEME_STORAGE_KEY = 'sbt.theme'

const initialAccount = {
  name: '',
  email: '',
  password: '',
  passkey: '',
  isOnboarded: false,
}

function App() {
  const [theme, setTheme] = useLocalStorage(THEME_STORAGE_KEY, 'light')
  const [account, setAccount] = useLocalStorage(ACCOUNT_STORAGE_KEY, initialAccount)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [onboardingFeedback, setOnboardingFeedback] = useState('')
  const [authFeedback, setAuthFeedback] = useState('')
  const [authMode, setAuthMode] = useState(() => (account.isOnboarded ? 'signin' : 'signup'))
  const { summary, transactions, addTransaction, resetTransactions } = useTransactions()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const dashboardSummary = useMemo(
    () => ({
      balance: summary.balance,
      income: summary.income,
      expense: summary.expense,
      monthlyBudget: Math.max(summary.income, 1),
      monthlyExpense: summary.expense,
      currentMonthLabel: new Date().toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
      }),
      savingsBalance: 0,
      topGoalTarget: Math.max(summary.income, 1),
      goalCount: transactions.length,
      transactionCount: transactions.length,
    }),
    [summary, transactions.length],
  )

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const signUp = ({ name, email, password, passkey }) => {
    if (!name.trim()) {
      setOnboardingFeedback('Your name is required to create an account.')
      return { ok: false }
    }

    if (!email.trim()) {
      setOnboardingFeedback('Email is required to create an account.')
      return { ok: false }
    }

    if (!isValidPassword(password)) {
      setOnboardingFeedback(
        'Password must be at least 6 characters and include an uppercase letter, lowercase letter, number, and special character.',
      )
      return { ok: false }
    }

    if (!isValidPasskey(passkey)) {
      setOnboardingFeedback('Passkey must be 4 to 6 digits and contain numbers only.')
      return { ok: false }
    }

    setAccount({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      passkey: passkey.trim(),
      isOnboarded: true,
    })
    setIsAuthenticated(true)
    setAuthMode('signin')
    setOnboardingFeedback('')
    setAuthFeedback('')
    return { ok: true }
  }

  const signIn = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()

    if (!normalizedEmail || !password) {
      setAuthFeedback('Enter your email and password to continue.')
      return { ok: false }
    }

    if (normalizedEmail !== account.email || password !== account.password) {
      setAuthFeedback('Incorrect email or password.')
      return { ok: false }
    }

    setIsAuthenticated(true)
    setAuthFeedback('')
    return { ok: true }
  }

  const signOut = () => {
    setIsAuthenticated(false)
    setAuthFeedback('')
  }

  const resetAllData = () => {
    setAccount(initialAccount)
    setIsAuthenticated(false)
    setOnboardingFeedback('')
    setAuthFeedback('')
    setAuthMode('signup')
    resetTransactions()
  }

  const authApp = {
    theme,
    toggleTheme,
    onboardingFeedback,
    authFeedback,
    signUp,
    signIn,
    resetAllData,
  }

  if (!account.isOnboarded || !isAuthenticated) {
    return authMode === 'signup' ? (
      <Signup authApp={authApp} onSwitchToSignIn={() => setAuthMode('signin')} />
    ) : (
      <Signin authApp={authApp} onSwitchToSignUp={() => setAuthMode('signup')} />
    )
  }

  return (
    <PageShell
      theme={theme}
      onToggleTheme={toggleTheme}
      onSignOut={signOut}
      profile={account}
      summary={dashboardSummary}
    >
      <Dashboard summary={dashboardSummary} transactions={transactions} onAddTransaction={addTransaction} />
    </PageShell>
  )
}

export default App
