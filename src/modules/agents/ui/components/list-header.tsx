'use client'

import { useState } from 'react'
import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { NewAgentDialog } from './new-agent-dialog'

export const AgentsListHeader = () => {
  const [isNewAgentDialogOpen, setIsNewAgentDialogOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Agents</h5>
          <Button onClick={() => setIsNewAgentDialogOpen(true)}>
            <PlusIcon className="h-4 w-4" />
            New Agent
          </Button>
        </div>
      </div>
      <NewAgentDialog
        open={isNewAgentDialogOpen}
        setOpen={setIsNewAgentDialogOpen}
      />
    </>
  )
}
