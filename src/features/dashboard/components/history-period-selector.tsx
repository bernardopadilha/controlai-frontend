import { SkeletonWrapper } from '@/components/skeleton-wrapper'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetHistoryPeriods } from '../api/use-get-history-periods'
import type { Period } from '../types'

interface Props {
  period: Period
  setPeriod: (period: Period) => void
  timeFrame: "month" | "year"
  setTimeFrame: (timeFrame: "month" | "year") => void
}

export function HistoryPeriodSelector({
  period,
  setPeriod,
  timeFrame,
  setTimeFrame,
}: Props) {
  const historyPeriods = useGetHistoryPeriods()

  return (
    <div className="flex flex-wrap items-center gap-4">
      <SkeletonWrapper isLoading={historyPeriods.isFetching} fullWidth={false}>
        <Tabs
          value={timeFrame}
          onValueChange={(value) => setTimeFrame(value as "month" | "year")}
        >
          <TabsList>
            <TabsTrigger value="year">Ano</TabsTrigger>
            <TabsTrigger value="month">Mês</TabsTrigger>
          </TabsList>
        </Tabs>
      </SkeletonWrapper>

      <div className="flex flex-wrap items-center gap-2">
        <SkeletonWrapper
          isLoading={historyPeriods.isFetching}
          fullWidth={false}
        >
          <YearSelector
            period={period}
            setPeriod={setPeriod}
            years={historyPeriods.data || []}
          />
        </SkeletonWrapper>
        {timeFrame === 'month' && (
          <SkeletonWrapper isLoading={historyPeriods.isFetching} fullWidth={false}>
            <MonthSelector period={period} setPeriod={setPeriod} />
          </SkeletonWrapper>
        )}
      </div>
    </div>
  )
}

function YearSelector({
  years,
  period,
  setPeriod,
}: {
  period: Period
  setPeriod: (period: Period) => void
  years: number[]
}) {
  return (
    <Select
      value={period.year.toString()}
      onValueChange={(value) => {
        setPeriod({
          month: period.month,
          year: parseInt(value),
        })
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {years.map((year) => (
          <SelectItem key={year} value={year.toString()}>
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function MonthSelector({
  period,
  setPeriod,
}: {
  period: Period
  setPeriod: (period: Period) => void
}) {
  return (
    <Select
      value={period.month.toString()}
      onValueChange={(value) => {
        setPeriod({
          year: period.year,
          month: parseInt(value),
        })
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((month) => {
          const monthStr = new Date(period.year, month, 1).toLocaleString(
            'default',
            { month: 'long' },
          )
          return (
            <SelectItem
              key={month}
              value={month.toString()}
              className="capitalize"
            >
              {monthStr}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
