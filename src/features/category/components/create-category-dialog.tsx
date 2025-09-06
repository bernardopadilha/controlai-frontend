import { useTheme } from '@/components/theme-provider'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleOffIcon, Loader2, PlusSquareIcon } from 'lucide-react'
import { useCallback, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useCreateCategory } from '../api/use-create-category'
import { CreateCategorySchema, type CreateCategorySchemaProps } from '../schema'
import type { Category } from '../types'

interface Props {
  successCallback: (category: Category) => void
  trigger?: ReactNode
}

export function CreateCategoryDialog({
  trigger,
  successCallback,
}: Props) {
  const [open, setOpen] = useState(false)
  const form = useForm<CreateCategorySchemaProps>({
    resolver: zodResolver(CreateCategorySchema),
  })

  const theme = useTheme()

  const { mutate, isPending } = useCreateCategory({
    reset: form.reset,
    setOpen,
    successCallback,
  })

  const onSubmit = useCallback(
    (values: CreateCategorySchemaProps) => {
      toast.loading('Criando categoria...', {
        id: 'create-category',
      })
      mutate(values)
    },
    [mutate],
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button
            variant={'ghost'}
            className="flex border-separate items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground"
          >
            <PlusSquareIcon className="mr-2 size-4" />
            Criar categoria
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Crie uma nova <span className='text-rose-500'>Categoria</span>
          </DialogTitle>
          <DialogDescription>
            As categorias são usadas para agrupar suas transações
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Categoria" />
                  </FormControl>
                  <FormDescription>
                    É assim que a categoria aparecerá no aplicativo
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ícone</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={'outline'}
                          className="h-[100px] w-full"
                        >
                          {form.watch('icon') ? (
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-5xl" role="img">
                                {field.value}
                              </span>
                              <p className="text-xs text-muted-foreground">
                                Click to change
                              </p>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <CircleOffIcon className="size-[48px]" />
                              <p className="text-xs text-muted-foreground">
                                Clique para escolher o emoji
                              </p>
                            </div>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="center"
                        side={'right'}
                        className="w-full"
                      >
                        <Picker
                          theme={theme}
                          data={data}
                          onEmojiSelect={(emoji: { native: string }) => {
                            field.onChange(emoji.native)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormDescription>
                    É assim que a categoria aparecerá no aplicativo
                  </FormDescription>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              disabled={isPending}
              variant={'secondary'}
              onClick={() => {
                form.reset()
              }}
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button disabled={isPending} onClick={form.handleSubmit(onSubmit)}>
            {!isPending && 'Salvar'}
            {isPending && <Loader2 className="size-4 animate-spin" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
