import { currencyFormatFn } from '@/_config/lib/helpers'
import { SkeletonWrapper } from '@/components/skeleton-wrapper'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useGetExpensePerCategory } from '@/features/expense/api/use-get-expense-per-category'

interface Props {
  from: Date
  to: Date
}

export function CategoriesStats({ to, from }: Props) {
  const { data, isFetching } = useGetExpensePerCategory({
    to,
    from
  })

  const total = data?.reduce(
    (acc, el) => acc + (Number(el._sum?.amount) || 0),
    0,
  )

  return (
    <div className="flex w-full flex-wrap gap-2 md:flex-nowrap">
      <SkeletonWrapper isLoading={isFetching}>
        <Card className="h-80 w-full">
          <CardHeader>
            <CardTitle className="grid grid-flow-row justify-between gap-2 text-2xl text-muted-foreground md:grid-flow-col">
              Despesas por categoria
            </CardTitle>
          </CardHeader>

          <div className="flex items-center justify-between gap-2">
            {data?.length === 0 && (
              <div className="flex h-60 w-full flex-col items-center justify-center">
                Sem despesas cadastradas neste período
                <p className="text-sm text-muted-foreground">
                  Tente selecionar outro período, ou tente criar uma nova despesa
                </p>
              </div>
            )}
            {data && data.length > 0 && (
              <ScrollArea className="h-60 w-full px-4">
                <div className="flex w-full flex-col p-4 gap-4">
                  {data.map((item: any) => {
                    const amount = item._sum.amount || 0
                    const percentage = (amount * 100) / (total || amount)

                    return (
                      <div className="flex flex-col gap-2" key={item.category}>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center text-gray-400">
                            {item.categoryIcon} {item.category}
                            <span className="ml-2 text-xs text-muted-foreground">
                              ({percentage.toFixed(0)}%)
                            </span>
                          </span>

                          <span className="text-sm text-gray-400">
                            {currencyFormatFn(amount)}
                          </span>
                        </div>
                        <Progress
                          value={percentage}
                          indicator={'bg-red-500'}
                        />
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            )}
          </div>
        </Card>
      </SkeletonWrapper>
    </div>
  )
}
