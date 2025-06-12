import { Dispatch, SetStateAction } from 'react'

import {
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from '@/components/ui/command'

type Props = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a agent or meeting" />
      <CommandList>
        <CommandItem>test</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  )
}
