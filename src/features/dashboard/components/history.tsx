/* eslint-disable @typescript-eslint/no-explicit-any */
import { currencyFormatFn } from '@/_config/lib/helpers'
import { cn } from '@/_config/lib/utils'
import { SkeletonWrapper } from '@/components/skeleton-wrapper'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'
import CountUp from 'react-countup'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { UseGetHistoryData } from '../api/use-get-history-data'
import type { Period } from '../types'
import { HistoryPeriodSelector } from './history-period-selector'

export function History() {
  const [timeFrame, setTimeFrame] = useState<'month' | 'year'>('month')
  const [period, setPeriod] = useState<Period>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  })

  const historyDataQuery = UseGetHistoryData({
    period,
    timeFrame,
  })

  const dataAvailable =
    historyDataQuery.data && historyDataQuery.data.length > 0

  return (
    <div className="container">
      <h2 className="mt-12 text-3xl font-medium">History</h2>
      <Card className="col-span-12 mt-2 w-full">
        <CardHeader className="gap-2">
          <CardTitle className="grid grid-flow-row justify-between gap-2 md:grid-flow-col">
            <HistoryPeriodSelector
              period={period}
              setPeriod={setPeriod}
              timeFrame={timeFrame}
              setTimeFrame={setTimeFrame}
            />

            <div className="flex h-10 gap-2">
              <Badge
                variant={'outline'}
                className="flex items-center gap-2 text-sm"
              >
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-red-500"></span>
                </span>
                Despesas
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SkeletonWrapper isLoading={historyDataQuery.isFetching}>
            {dataAvailable && (
              <ResponsiveContainer width={'100%'} height={300}>
                <BarChart
                  height={300}
                  data={historyDataQuery.data}
                  barCategoryGap={5}
                >
                  <defs>
                    <linearGradient id="expenseBar" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset={'0'}
                        stopColor="#ef4444"
                        stopOpacity={'1'}
                      />
                      <stop
                        offset={'1'}
                        stopColor="#ef4444"
                        stopOpacity={'0'}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray={'5 5'}
                    strokeOpacity={'0.2'}
                    vertical={false}
                  />
                  <XAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    padding={{ left: 5, right: 5 }}
                    dataKey={(data) => {
                      const { year, month, day } = data
                      const date = new Date(year, month, day || 1)
                      if (timeFrame === 'year') {
                        return date.toLocaleString('default', {
                          month: 'long',
                        })
                      }
                      return date.toLocaleString('default', {
                        day: '2-digit',
                      })
                    }}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Bar
                    dataKey={'expense'}
                    label="Despesas"
                    fill="url(#expenseBar)"
                    radius={4}
                    className="cursor-pointer"
                  />
                  <Tooltip
                    cursor={{ opacity: 0.1 }}
                    content={(props) => <CustomTooltip {...props} />}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
            {!dataAvailable && (
              <Card className="flex h-[300px] flex-col items-center justify-center bg-background gap-2">
                <h2>Sem despesas cadastradas neste período</h2>
                <p className="text-sm text-muted-foreground">
                  Tente selecionar outro período, ou tente criar uma nova
                  despesa
                </p>
              </Card>
            )}
          </SkeletonWrapper>
        </CardContent>
      </Card>
    </div>
  )
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload || payload.length === 0) return null

  const data = payload[0].payload
  const { expense } = data

  return (
    <div className="min-w-[300px] rounded border bg-background p-4">
      <TooltipRow
        label="Despesas"
        value={expense}
        bgColor="bg-red-500"
        textColor="text-red-500"
      />
    </div>
  )
}

function TooltipRow({
  value,
  label,
  bgColor,
  textColor,
}: {
  label: string
  textColor: string
  bgColor: string
  value: number
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={cn('size-3.5 rounded-full', bgColor)} />
      <div className="flex w-full justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className={cn('text-sm font-bold', textColor)}>
          <CountUp
            duration={0.5}
            preserveValue
            end={value}
            decimals={0}
            formattingFn={currencyFormatFn}
            className="text-sm"
          />
        </div>
      </div>
    </div>
  )
}
