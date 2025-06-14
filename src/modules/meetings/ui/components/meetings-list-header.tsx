'use client'

import { useState } from 'react'
import { PlusIcon, XCircleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

import { useMeetingsFilters } from '../../hooks/use-meetings-filters'
import { AgentIdFilter } from './agent-id-filter'
import { MeetingsSearchFilters } from './meetings-search-filters'
import { NewMeetingDialog } from './new-meeting-dialog'
import { StatusFilter } from './status-filter'

export const MeetingsListHeader = () => {
  const [isNewMeetingDialogOpen, setIsNewMeetingDialogOpen] = useState(false)
  const [filters, setFilters] = useMeetingsFilters()

  const isAnyFilterModified =
    !!filters.status || !!filters.agentId || !!filters.search

  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: '',
      search: '',
      page: 1,
    })
  }

  return (
    <>
      <NewMeetingDialog
        open={isNewMeetingDialogOpen}
        setOpen={setIsNewMeetingDialogOpen}
      />
      <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Meetings</h5>
          <Button onClick={() => setIsNewMeetingDialogOpen(true)}>
            <PlusIcon className="h-4 w-4" />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <MeetingsSearchFilters />
            <StatusFilter />
            <AgentIdFilter />
            {isAnyFilterModified && (
              <Button variant="outline" onClick={onClearFilters}>
                <XCircleIcon className="size-4" />
                Clear Filters
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  )
}
