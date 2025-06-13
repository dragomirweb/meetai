'use client'

import { useState } from 'react'
import { PlusIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { NewMeetingDialog } from './new-meeting-dialog'

export const MeetingsListHeader = () => {
  const [isNewMeetingDialogOpen, setIsNewMeetingDialogOpen] = useState(false)

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
        <div className="flex items-center gap-x-2 p-1">todo filters</div>
      </div>
    </>
  )
}
