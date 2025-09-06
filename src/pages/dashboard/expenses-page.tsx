import { MAX_DATE_RANGE_DAYS } from '@/_config/lib/constants'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import TransactionTable from '@/features/expense/components/expense-table'
import { differenceInDays, startOfMonth } from 'date-fns'
import { useState } from 'react'
import { toast } from 'sonner'

export default function TransactionsPage() {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date(),
  })

  return (
    <div className="flex flex-col items-center">
      <div className="border-b bg-card flex w-full justify-center">
        <div className="container flex flex-wrap items-center justify-between gap-6 py-8 px-4">
          <div>
            <p className="text-3xl font-medium">Histórico de Despesas</p>
          </div>
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(values) => {
              const { from, to } = values.range

              if (!from || !to) return
              if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                toast.error(
                  `O intervalo de datas selecionado é muito grande. O intervalo máximo permitido é de ${MAX_DATE_RANGE_DAYS} dias`,
                )
                return
              }

              setDateRange({ from, to })
            }}
          />
        </div>
      </div>

      <div className="container flex flex-col gap-4 p-4">
        <TransactionTable from={dateRange.from} to={dateRange.to} />
      </div>
    </div>
  )
}
