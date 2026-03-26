export const DEFAULT_BUDGET = 0

export function isValidPassword(password = '') {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/.test(password)
}

export function isValidPasskey(passkey = '') {
  return /^\d{4,6}$/.test(passkey)
}

export function createTransaction(data = {}) {
  const now = new Date().toISOString()
  return {
    id: data.id || `tx_${Date.now()}`,
    amount: Number(data.amount) || 0,
    type: data.type || 'expense',
    category: data.category || 'Other',
    date: data.date || now,
    note: data.note || '',
  }
}
