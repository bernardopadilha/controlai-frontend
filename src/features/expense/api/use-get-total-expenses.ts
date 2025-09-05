/* eslint-disable prettier/prettier */
import { api } from '@/_config/lib/axios';
import { useQuery } from '@tanstack/react-query';

export function UseGetTotalExpenses({ to, from }: { from: Date; to: Date }) {
  const query = useQuery<number, Error>({
    queryKey: ['overview', 'stats', from, to],
    queryFn: async () => {
      const res = await api.get(
        `/expenses/balance/total?from=${String(from)}&to=${String(to)}`,
      )
      return res.data._sum.amount
    },
  })

  return query
}
