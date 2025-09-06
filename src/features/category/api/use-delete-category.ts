import { api } from '@/_config/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function UseDeleteCategory({ categoryId }: { categoryId: string }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      await api.delete(`/categories/${categoryId}`)
    },
    onSuccess: () => {
      toast.success('Category deleted successfully', {
        id: categoryId,
      })

      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: () => {
      toast.error('Something went wrong', {
        id: categoryId,
      })
    },
  })

  return mutation
}
