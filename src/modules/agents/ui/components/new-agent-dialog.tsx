import { ResponsiveDialog } from '@/components/responsive-dialog'

import { AgentForm } from '@/modules/agents/ui/components/agent-form'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

export const NewAgentDialog = ({ open, setOpen }: Props) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      title="New Agent"
      description="Create a new agent"
    >
      <AgentForm
        onSuccess={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </ResponsiveDialog>
  )
}
