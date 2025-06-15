'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { toast } from 'sonner'

import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'

import { useConfirm } from '@/hooks/use-confirm'
import { useTRPC } from '@/trpc/client'

import { ActiveState } from '../components/active-state'
import { CancelledState } from '../components/cancelled-state'
import { MeetingIdViewHeader } from '../components/meeting-id-view-header'
import { ProcessingState } from '../components/processing-state'
import { UpcomingState } from '../components/upcoming-state'
import { UpdateMeetingDialog } from '../components/update-meeting-dialog'

interface Props {
  meetingId: string
}

export const MeetingsDetailView = ({ meetingId }: Props) => {
  const trpc = useTRPC()
  const router = useRouter()
  const queryClient = useQueryClient()

  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false)

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({
      id: meetingId,
    })
  )

  const [RemoveConfirmation, confirmRemove] = useConfirm(
    'Are you sure?',
    `The following action will remove the meeting ${data.name}`
  )

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
        // TODO: invalidate free tier usage
        router.push('/meetings')
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })
  )

  const handleRemoveMeeting = async () => {
    const ok = await confirmRemove()
    if (!ok) return

    await removeMeeting.mutateAsync({ id: meetingId })
  }
  const isActiveMeeting = data.status === 'active'
  const isUpcoming = data.status === 'upcoming'
  const isCancelled = data.status === 'cancelled'
  const isCompleted = data.status === 'completed'
  const isProcessing = data.status === 'processing'

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        setOpen={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={() => handleRemoveMeeting()}
        />
        {isProcessing && <ProcessingState />}
        {isCompleted && <div>Completed</div>}
        {isCancelled && <CancelledState />}
        {isActiveMeeting && <ActiveState meetingId={meetingId} />}
        {isUpcoming && (
          <UpcomingState
            meetingId={meetingId}
            onCancelMeeting={() => {}}
            isCancelling={false}
          />
        )}
      </div>
    </>
  )
}

export const MeetingsDetailViewLoading = () => {
  return (
    <LoadingState
      title="Loading meeting details"
      message="Please wait while we load the meeting details"
    />
  )
}

export const MeetingsDetailViewError = () => {
  return (
    <ErrorState
      title="Error loading meeting details"
      message="Please try again later"
    />
  )
}
