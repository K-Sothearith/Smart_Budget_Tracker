import { useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { createTransaction } from '../utils/data'

const STORAGE_KEY = 'sbt.transactions'

export function useTransactions() {
  const [transactions, setTransactions] = useLocalStorage(STORAGE_KEY, [])

  const addTransaction = (data) => {
    setTransactions((prev) => [createTransaction(data), ...prev])
  }

  const removeTransaction = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id))
  }

  const resetTransactions = () => {
    setTransactions([])
  }

  const summary = useMemo(() => {
    const income = transactions
      .filter((item) => item.type === 'income')
      .reduce((sum, item) => sum + item.amount, 0)
    const expense = transactions
      .filter((item) => item.type === 'expense')
      .reduce((sum, item) => sum + item.amount, 0)
    const balance = income - expense
    return { income, expense, balance }
  }, [transactions])

  return {
    transactions,
    addTransaction,
    removeTransaction,
    resetTransactions,
    summary,
  }
}
