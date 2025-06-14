'use client'

import { useState } from 'react'
import { PlusIcon, XCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { DEFAULT_PAGE } from '@/constants'
import { useAgentFilters } from '@/modules/agents/hooks/use-agent-filters'
import { AgentsSearchFilters } from '@/modules/agents/ui/components/agents-search-filters'
import { NewAgentDialog } from '@/modules/agents/ui/components/new-agent-dialog'

export const AgentsListHeader = () => {
  const [filters, setFilters] = useAgentFilters()
  const [isNewAgentDialogOpen, setIsNewAgentDialogOpen] = useState(false)

  const isAnyFilterApplied = !!filters.search

  const onClearFilters = () => {
    setFilters({ search: '', page: DEFAULT_PAGE })
  }

  return (
    <>
      <NewAgentDialog
        open={isNewAgentDialogOpen}
        setOpen={setIsNewAgentDialogOpen}
      />
      <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Agents</h5>
          <Button onClick={() => setIsNewAgentDialogOpen(true)}>
            <PlusIcon className="h-4 w-4" />
            New Agent
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <AgentsSearchFilters />
            {isAnyFilterApplied && (
              <Button variant="outline" size="sm" onClick={onClearFilters}>
                <XCircleIcon />
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  )
}
