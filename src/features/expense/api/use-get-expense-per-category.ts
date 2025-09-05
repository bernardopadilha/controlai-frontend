/* eslint-disable prettier/prettier */
import { api } from '@/_config/lib/axios';
import { useQuery } from '@tanstack/react-query';
import type { ExpensePerCategory } from '../types';

export function useGetExpensePerCategory({ to, from }: { from: Date; to: Date }) {
  const query = useQuery<ExpensePerCategory[] | []>({
    queryKey: ['overview', 'stats', 'categories', from, to],
    queryFn: async () => {
      const { data } = await api.get(
        `/expenses/balance/per-categories?from=${String(from)}&to=${String(to)}`,
      )
      return data
    }
  })

  return query
}
