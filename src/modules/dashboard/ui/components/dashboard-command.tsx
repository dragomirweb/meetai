import { Dispatch, SetStateAction } from 'react'

import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const DashboardCommand = ({
  open,
  setOpen,
}: Props) => {
  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a agend or meeting" />
      <CommandList>
        <CommandItem>test</CommandItem>
      </CommandList>
    </CommandDialog>
  )
}
