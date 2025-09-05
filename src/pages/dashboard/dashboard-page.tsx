import { Button } from '@/components/ui/button'
import { CreateExpenseDialog } from '@/features/expense/components/create-expense-dialog'

export default function DashboardPage() {
  return (
    <div className="bg-background flex flex-col items-center">
      <div className="w-full flex justify-center border-b bg-card">
        <div className="container w-full flex flex-wrap items-center justify-between gap-6 py-8">
          <p className="text-3xl font-semibold">Olá, Bernardo 👋</p>
          <div className="flex items-center gap-3">
            <CreateExpenseDialog
              trigger={
                <Button
                  variant={'outline'}
                  className="border-rose-500! bg-rose-500 hover:bg-rose-500 hover:brightness-90 dark:hover:brightness-100 dark:bg-rose-950 text-white dark:hover:bg-rose-700 hover:text-white"
                >
                  Nova despesa 💰
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
}
