import { SkeletonWrapper } from '@/components/skeleton-wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { useGetAllCategories } from '@/features/category/api/use-get-all-categories'
import { CreateCategoryDialog } from '@/features/category/components/create-category-dialog'
import DeleteCategoryDialog from '@/features/category/components/delete-category-dialog'
import { UpdateCategoryDialog } from '@/features/category/components/update-category-dialog'
import type { Category } from '@/features/category/types'
import {
  MoreHorizontalIcon,
  PencilIcon,
  PlusSquareIcon,
  TrashIcon,
  TrendingDownIcon,
} from 'lucide-react'

export default function CategoriesPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="border-b bg-card w-full flex justify-center">
        <div className="container flex flex-wrap items-center w-full justify-between gap-6 py-8 px-4">
          <div>
            <p className="text-3xl font-bold">Categorias</p>
            <p className="text-muted-foreground">Configure suas categorias</p>
          </div>
        </div>
      </div>

      <div className="container flex flex-col gap-4 p-4">
        <CategoryList />
      </div>
    </div>
  )
}

function CategoryList() {
  const categoriesQuery = useGetAllCategories()
  const dataAvailable = categoriesQuery.data && categoriesQuery.data.length > 0

  return (
    <SkeletonWrapper isLoading={categoriesQuery.isLoading}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <TrendingDownIcon className="size-12 items-center rou rounded-lg bg-rose-400/10 p-2 text-rose-500" />
              <div className="text-2xl">
                Categorias de despesas
                <div className="text-sm text-muted-foreground">
                  Sorteado por nome
                </div>
              </div>
            </div>

            <CreateCategoryDialog
              successCallback={() => categoriesQuery.refetch()}
              trigger={
                <Button variant={'outline'} className="gap-2 text-sm">
                  <PlusSquareIcon className="size-4 " />
                  Criar categoria
                </Button>
              }
            />
          </CardTitle>
        </CardHeader>
        <Separator />
        {!dataAvailable && (
          <div className="flex h-40 w-full items-center justify-center">
            <p>Nenhuma categoria encontrada</p>

            <p className="text-sm text-muted-foreground">
              Crie sua primeira categoria
            </p>
          </div>
        )}
        {dataAvailable && (
          <div className="grid grid-flow-row gap-2 p-2 sm:grid-flow-row sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categoriesQuery.data.map((category: Category) => (
              <div
                key={category.id}
                className="group relative flex border-separate flex-col justify-between rounded-md border"
              >
                <div className="flex flex-col items-center gap-2 p-4">
                  <span className="text-3xl" role="img">
                    {category.icon}
                  </span>
                  <span>{category.name}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant={'outline'}
                      className="size-8 p-0 absolute right-2 top-2"
                    >
                      <span className="sr-only">Abrir menu</span>
                      <MoreHorizontalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="space-y-1">
                      <DropdownMenuItem asChild>
                        <UpdateCategoryDialog
                          category={category}
                          trigger={
                            <Button
                              variant={'secondary'}
                              className="flex w-full border-separate items-center gap-2 text-muted-foreground hover:bg-rose-500/20"
                            >
                              <PencilIcon className="size-4" />
                              Atualizar
                            </Button>
                          }
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <DeleteCategoryDialog
                          category={category}
                          trigger={
                            <Button
                              variant={'secondary'}
                              className="flex w-full border-separate items-center gap-2 text-muted-foreground hover:bg-rose-500/20"
                            >
                              <TrashIcon className="size-4" />
                              Remover
                            </Button>
                          }
                        />
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </Card>
    </SkeletonWrapper>
  )
}
