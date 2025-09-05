import { api } from '@/_config/lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { UseFormReset } from 'react-hook-form'
import { toast } from 'sonner'
import type { CreateCategorySchemaProps } from '../schema'
import type { Category } from '../types'

export function useCreateCategory({
  reset,
  setOpen,
  successCallback,
}: {
  reset: UseFormReset<CreateCategorySchemaProps>
  successCallback: (category: Category) => void
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async ({ icon, name }: CreateCategorySchemaProps) => {
      const { data } = await api.post('/categories', {
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

      toast.success(`Categoria ${data.name} criada com sucesso 🎉`, {
        id: 'create-category',
      })

      successCallback(data)

      queryClient.invalidateQueries({ queryKey: ['categories'] })

      setOpen((prev) => !prev)
    },
    onError: (error) => {
      toast.error(error.message, {
        id: 'create-category',
      })
    },
  })

  return mutation
}
