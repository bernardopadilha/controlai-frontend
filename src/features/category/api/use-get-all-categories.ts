import { api } from '@/_config/lib/axios'
import { useQuery } from '@tanstack/react-query'
import type { Category } from '../types'

export function useGetAllCategories() {
  const query = useQuery<Category[], Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get(`/categories`)
      return data
    },
  })

  return query
}
