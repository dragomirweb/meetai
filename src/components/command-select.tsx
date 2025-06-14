import { ReactNode, useState } from 'react'
import { ChevronsUpDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from '@/components/ui/command'

import { cn } from '@/lib/utils'

interface Props {
  options: Array<{ id: string; value: string; children: ReactNode }>
  onSelect: (value: string) => void
  onSearch?: (value: string) => void
  value: string
  placeholder?: string
  isSearchable?: boolean
  className?: string
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = 'Select an option',
  className,
}: Props) => {
  const [open, setOpen] = useState(false)

  const selectedOption = options.find((option) => option.id === value) ?? null

  const handleOpenChange = (open: boolean) => {
    onSearch?.('')
    setOpen(open)
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          'h-9 justify-between px-2 font-normal',
          !selectedOption && 'text-muted-foreground',
          className
        )}
        onClick={() => setOpen(true)}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsUpDownIcon className="size-4" />
      </Button>
      <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={handleOpenChange}
      >
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty className="text-muted-foreground text-sm">
            No results found
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              value={option.id}
              onSelect={() => {
                onSelect(option.value)
                setOpen(false)
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  )
}
