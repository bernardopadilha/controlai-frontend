import { cn } from '@/_config/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronsUpDownIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useGetAllCategories } from '../api/use-get-all-categories'
import type { Category } from '../types'
import { CreateCategoryDialog } from './create-category-dialog'

interface Props {
  onChange: (value: string) => void
}

export function CategoryPicker({ onChange }: Props) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  useEffect(() => {
    if (!value) return
    onChange(value)
  }, [onChange, value])


  const categoriesQuery = useGetAllCategories()

  const selectedCategory = categoriesQuery.data?.find(
    (category: Category) => category.id === value,
  )

  const successCallback = useCallback(
    (category: Category) => {
      setValue(category.name)
      setOpen((prev) => !prev)
    },
    [setOpen, setValue],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          role="combobox"
          aria-expanded={open}
          className="w-[210px] justify-between"
        >
          {selectedCategory ? (
            <CategoryRow category={selectedCategory} />
          ) : (
            'Selecionar categoria'
          )}
          <ChevronsUpDownIcon
            className={cn('ml-2 h-4 w-4 shrink-0 opacity-50')}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          onSubmit={(e) => {
            e.preventDefault()
          }}
        >
          <CommandInput placeholder="Procure a categoria..." />
          <CreateCategoryDialog successCallback={successCallback} />
          <CommandEmpty>
            <p className='text-xs'>Categoria não encontrada</p>
            <p className="text-xs text-muted-foreground">
              Crie uma categoria
            </p>
          </CommandEmpty>
          <CommandGroup>
            <CommandList>
              {categoriesQuery.data &&
                categoriesQuery.data.map((category: Category) => (
                  <CommandItem
                    key={category.name}
                    onSelect={() => {
                      setValue(category.id)
                      setOpen((prev) => !prev)
                    }}
                  >
                    <CategoryRow category={category} />
                    <Check
                      className={cn(
                        'mr-2 size-4 opacity-0',
                        value === category.name && 'opacity-100',
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

function CategoryRow({ category }: { category: Category }) {
  return (
    <div className="flex items-center gap-2">
      <span role="img">{category.icon}</span>
      <span>{category.name}</span>
    </div>
  )
}
