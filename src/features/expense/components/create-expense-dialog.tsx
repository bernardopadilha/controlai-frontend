'use client'

import { cn } from '@/_config/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogClose,
  DialogContent,
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
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CategoryPicker } from '@/features/category/components/category-picker'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Loader2 } from 'lucide-react'
import { type ReactNode, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useCreateExpense } from '../api/use-create-expense'
import { CreateExpenseSchema, type CreateExpenseSchemaType } from '../schema'

interface Props {
  trigger: ReactNode
}

export function CreateExpenseDialog({ trigger }: Props) {
  const form = useForm<CreateExpenseSchemaType>({
    resolver: zodResolver(CreateExpenseSchema),
    defaultValues: {
      date: new Date(),
    },
  })
  const [open, setOpen] = useState(false)

  const handleCategoryChange = useCallback(
    (value: string) => {
      form.setValue('categoryId', value)
    },
    [form],
  )

  const { mutate, isPending } = useCreateExpense({
    reset: form.reset,
    setOpen
  })

  const onSubmit = useCallback(
    (values: CreateExpenseSchemaType) => {
      toast.loading('Criando despesa...', {
        id: 'create-expense',
      })

      mutate({
        ...values,
      })
    },
    [mutate],
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Crie uma nova <span className='text-red-500'>despesa</span>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input defaultValue={''} placeholder='Insira sua descrição' {...field} />
                  </FormControl>
                  <FormDescription>
                    Descrição da despesa
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      value={
                        field.value !== undefined && field.value !== null
                          ? new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(field.value / 100)
                          : ""
                      }
                      onChange={(e) => {
                        let raw = e.target.value.replace(/\D/g, "")

                        if (!raw) {
                          field.onChange(undefined)
                          return
                        }

                        const cents = Number(raw)
                        field.onChange(cents)
                      }}
                      type="text"
                      placeholder="Insira o valor"
                    />
                  </FormControl>
                  <FormDescription>
                    Valor da despesa
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between gap-2">
              <FormField
                control={form.control}
                name="categoryId"
                render={() => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <CategoryPicker
                        onChange={handleCategoryChange}
                      />
                    </FormControl>
                    <FormDescription>
                      Selecione a categoria
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data da despesa</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-[210px] pl-3 justify-start font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'PPP', {
                                locale: ptBR
                              })
                            ) : (
                              <span>Selecione uma data</span>
                            )}
                            <CalendarIcon className="size-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          locale={ptBR}
                          selected={field.value}
                          onSelect={(value) => {
                            if (!value) return
                            field.onChange(value)
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Selecione uma data
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
