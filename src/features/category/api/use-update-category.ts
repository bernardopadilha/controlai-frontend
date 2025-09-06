import { api } from '@/_config/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseFormReset } from 'react-hook-form'
import { toast } from 'sonner'
import type { CreateCategorySchemaProps } from '../schema'
import type { Category } from '../types'

export function useUpdateCategory({
  reset,
  setOpen,
  categoryId,
}: {
  categoryId: string
  reset: UseFormReset<CreateCategorySchemaProps>
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ icon, name }: CreateCategorySchemaProps) => {
      const { data } = await api.patch(`/categories/${categoryId}`, {
        icon,
        name,
      })

      return data
    },
    onSuccess: (data: Category) => {
      reset({
        icon: '',
        name: '',
      })

      toast.success(`Categoria ${data.name} atualizada com sucesso 🎉`, {
        id: 'update-category',
      })

      queryClient.invalidateQueries({ queryKey: ['categories'] })

      setOpen((prev) => !prev)
    },
    onError: (error) => {
      toast.error(error.message, {
        id: 'update-category',
      })
    },
  })

  return mutation
}
