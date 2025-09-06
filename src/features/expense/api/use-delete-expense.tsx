import { api } from '@/_config/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useDeleteExpense({ expenseId }: { expenseId: string }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/expenses/${expenseId}`)
    },
    onSuccess: () => {
      toast.success('Despesa deletada com sucesso', {
        id: expenseId,
      })

      queryClient.invalidateQueries({ queryKey: ['expenses'] })
    },
    onError: (error) => {
      toast.error(error.message, {
        id: expenseId,
      })
    },
  })

  return mutation
}
