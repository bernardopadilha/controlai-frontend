import { api } from '@/_config/lib/axios'
import { useQuery } from '@tanstack/react-query'

export function useVerifyLogin() {
  const query = useQuery({
    queryKey: ['verify-login'],
    queryFn: async () => {
      const { data } = await api.get('auth/me')
      return data
    },
    retry: 0,
  })
  return query
}
