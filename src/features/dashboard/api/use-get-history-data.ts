import { api } from '@/_config/lib/axios'
import { useQuery } from '@tanstack/react-query'
import type { Period } from '../types'

export function UseGetHistoryData({
  period,
  timeFrame,
}: {
  timeFrame: 'year' | 'month'
  period: Period
}) {
  const query = useQuery({
    queryKey: ['overview', 'history', timeFrame, period],
    queryFn: async () => {
      const { data } = await api.get(
        `/expenses/history-data?timeframe=${timeFrame}&year=${period.year}&month=${period.month}`,
      )
      return data
    },
  })

  return query
}
