import { ResponsiveDialog } from '@/components/responsive-dialog'

import type { Agent } from '@/modules/agents/types'
import { AgentForm } from '@/modules/agents/ui/components/agent-form'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
  initialValues: Agent
}

export const UpdateAgentDialog = ({ open, setOpen, initialValues }: Props) => {
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      title="Edit Agent"
      description="Edit the agent details"
    >
      <AgentForm
        initialValues={initialValues}
        onSuccess={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </ResponsiveDialog>
  )
}
