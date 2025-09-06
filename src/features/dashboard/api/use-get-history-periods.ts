import { api } from '@/_config/lib/axios'
import { useQuery } from '@tanstack/react-query'

export function useGetHistoryPeriods() {
  const query = useQuery<number[] | []>({
    queryKey: ['overview', 'history', 'periods'],
    queryFn: async () => {
      const { data } = await api.get(`/expenses/history/periods`)
      return data
    },
  })

  return query
}
