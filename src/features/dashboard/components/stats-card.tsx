import { formatFn } from '@/_config/lib/helpers'
import { SkeletonWrapper } from '@/components/skeleton-wrapper'
import { Card } from '@/components/ui/card'
import { UseGetTotalExpenses } from '@/features/expense/api/use-get-total-expenses'
// import { GetFormatterForCurrency } from '@/lib/helpers'
import { TrendingDown } from 'lucide-react'
import { type ReactNode } from 'react'
import CountUp from 'react-countup'

interface Props {
  from: Date
  to: Date
}

export function StatsCards({ to, from }: Props) {
  const statsQuery = UseGetTotalExpenses({
    to,
    from
  })

  const expense = Number(statsQuery.data) || 0

  return (
    <div className="relative flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={statsQuery.isFetching}>
        <StatCard
          value={expense}
          title="Despesas"
          icon={
            <TrendingDown className="size-12 items-center rounded-lg p-2 text-rose-500 bg-rose-400/10" />
          }
        />
      </SkeletonWrapper>
    </div>
  )
}

interface StatCardProps {
  value: number
  title: string
  icon: ReactNode
}
function StatCard({ icon, title, value }: StatCardProps) {
  return (
    <Card className="flex h-24 w-full items-center flex-row gap-2 p-4">
      {icon}
      <div className="flex flex-col items-start gap-0">
        <p className="text-muted-foreground">{title}</p>
        <CountUp
          preserveValue
          redraw={false}
          end={value}
          decimals={2}
          formattingFn={formatFn}
          className="text-2xl"
        />
      </div>
    </Card>
  )
}
