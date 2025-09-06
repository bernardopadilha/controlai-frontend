import { Button } from '@/components/ui/button'
import { useUser } from '@/context/user-context'
import { History } from '@/features/dashboard/components/history'
import { Overview } from '@/features/dashboard/components/overview'
import { CreateExpenseDialog } from '@/features/expense/components/create-expense-dialog'

export default function DashboardPage() {
  const { user } = useUser()

  return (
    <div className="bg-background flex flex-col items-center pb-10">
      <div className="w-full flex justify-center border-b bg-card">
        <div className="container w-full flex flex-wrap items-center justify-between gap-6 py-8 px-4">
          <p className="text-3xl font-medium">
            Olá, {user?.name.split(' ')[0]} 👋
          </p>
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
      <div className="container w-full px-4">
        <Overview />
        <History />
      </div>
    </div>
  )
}
