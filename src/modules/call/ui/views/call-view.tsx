'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'

import { useTRPC } from '@/trpc/client'

import { CallProvider } from '../components/call-provider'

interface Props {
  meetingId: string
}

export const CallView = ({ meetingId }: Props) => {
  const trpc = useTRPC()

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  )

  if (data.status === 'completed') {
    return (
      <div className="flex flex-grow items-center justify-center">
        <ErrorState
          title="Meeting has ended"
          message="You can no longer join this meeting."
        />
      </div>
    )
  }

  return <CallProvider meetingId={meetingId} meetingName={data.name} />
}

export const CallViewLoading = () => {
  return (
    <LoadingState
      title="Loading call"
      message="Please wait while we load the call"
    />
  )
}

export const CallViewError = () => {
  return (
    <ErrorState
      title="Error initializing call"
      message="Please try again later"
    />
  )
}
