import { Cell, Label, Pie, PieChart } from 'recharts'

import { currencyFormatFn } from '@/_config/lib/helpers'
import { cn } from '@/_config/lib/utils'
import { SkeletonWrapper } from '@/components/skeleton-wrapper'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip
} from '@/components/ui/chart'
import { useGetExpensePerCategory } from '@/features/expense/api/use-get-expense-per-category'
import { useMemo } from 'react'
import CountUp from 'react-countup'

interface Props {
  from: Date
  to: Date
}

const chartConfig = {
  expense: {
    label: 'Despesas',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig

const COLORS = [
  "#F43F5E", // rose-500
  "#FDA4AF", // rose-300
  "#BE123C", // rose-700
  "#FB7185", // rose-400
  "#E11D48", // rose-600
]

export function CategoriesPieChart({ to, from }: Props) {
  const { data, isFetching } = useGetExpensePerCategory({
    to,
    from
  })

  const chartData = useMemo(() => {
    if (!data) return []
    return data.map((item, index) => ({
      category: `${item.category} ${item.categoryIcon ?? ""}`,
      expense: item._sum.amount,
      fill: COLORS[index % COLORS.length],
    }))
  }, [data])

  const totalExpenses = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.expense, 0)
  }, [chartData])

  return (
    <SkeletonWrapper isLoading={isFetching}>
      <Card className="flex flex-col w-full h-80 gap-0">
        <CardHeader className="items-center pb-0">
          <CardTitle className="grid grid-flow-row justify-between gap-2 text-2xl text-muted-foreground md:grid-flow-col">
            Despesas em gráfico
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          {data?.length === 0 && (
            <div className="flex h-60 w-full flex-col items-center justify-center">
              Sem despesas cadastradas neste período
              <p className="text-sm text-muted-foreground">
                Tente selecionar outro período, ou tente criar uma nova despesa
              </p>
            </div>
          )}
          {data && data.length > 0 && (
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[240px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<CustomTooltip />}
                />
                <Pie
                  data={chartData}
                  dataKey="expense"
                  nameKey="category"
                  innerRadius={70}
                  strokeWidth={5}
                >
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-xl font-bold"
                            >
                              {currencyFormatFn(totalExpenses)}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground text-xs"
                            >
                              Despesas
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </SkeletonWrapper>
  )
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || payload.length === 0) return null

  const data = payload[0].payload
  const amount = data.expense
  const label = data.category
  const color = data.fill

  return (
    <div className="min-w-[300px] rounded border bg-background p-4">
      <div className="flex items-center gap-2">
        <div style={{ backgroundColor: color }} className='size-3.5 rounded-full' />
        <div className="flex w-full justify-between">
          <p className="text-sm text-muted-foreground">{label}</p>
          <div className={cn('text-sm font-bold')}>
            <CountUp
              duration={0.5}
              preserveValue
              end={amount}
              decimals={0}
              formattingFn={currencyFormatFn}
              className="text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}