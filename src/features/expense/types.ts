import type { Category } from '../category/types'

export type ExpensePerCategory = {
  category: string
  categoryIcon: string
  _sum: {
    amount: 800000
  }
}

export type GetExpenseHistoryResponseType = {
  id: string
  amount: number
  description: string
  date: string
  userId: string
  categoryId: string
  createdAt: string
  updatedAt: string
  category: Category
}[]
