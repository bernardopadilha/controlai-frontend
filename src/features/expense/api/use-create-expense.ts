import { api } from '@/_config/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseFormReset } from 'react-hook-form'
import { toast } from 'sonner'
import type { CreateExpenseSchemaType } from '../schema'

export function useCreateExpense({
  reset,
  setOpen,
}: {
  reset: UseFormReset<CreateExpenseSchemaType>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({
      date,
      amount,
      categoryId,
      description,
    }: CreateExpenseSchemaType) => {
      const { data } = await api.post('/expenses', {
        date,
        amount,
        categoryId,
        description,
      })

      return data
    },
    onSuccess: () => {
      toast.success('Despesa criada com sucesso 🎉', {
        id: 'create-expense',
      })

      reset()

      // Invalida o overView para recarregar as despesas
      queryClient.invalidateQueries({
        queryKey: ['overview', 'expenses'],
      })

      setOpen((prev) => !prev)
    },
    onError: (error) => {
      toast.error(error.message, {
        id: 'create-expense',
      })
    },
  })

  return mutation
}
