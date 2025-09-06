/* eslint-disable prettier/prettier */
import { api } from '@/_config/lib/axios';
import { useQuery } from '@tanstack/react-query';
import type { GetExpenseHistoryResponseType } from '../types';

export function useGetExpenseHistory({ to, from }: { from: Date; to: Date }) {
  const query = useQuery<GetExpenseHistoryResponseType>({
    queryKey: ['expenses', 'history', from, to],
    queryFn: async () => {
      const { data } = await api.get(
        `/expenses/history?from=${String(from)}&to=${String(to)}`,
      )
      return data
    },
  })

  return query
}
